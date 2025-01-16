import { join } from 'path';
import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot';
import { MongoAdapter as Database } from '@builderbot/database-mongo';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';

import { Emergencia } from './Emergencia';
import { Platica } from './Platica';

const PORT = process.env.PORT ?? 3008;

export const welcomeFlow = addKeyword<Provider, Database>(['hi', 'hello', 'hola', 'Margot'])
    .addAnswer(">¡Hola! Soy Margot, la asistente virtual de Andrea, por el momento está de vacaciones.")
    .addAnswer(
        [
            "  Opciones para hablar con Andrea",
            "", // Espacio
            "1️.- Emergencia",
            "2.- Platica",
            "3.- Salir",
        ].join('\n'),
        { capture: true },
        async (ctx, { fallBack }) => {
            const validOptions = ["1", "2", "3"];

            if (!validOptions.includes(ctx.body)) {
                return fallBack("Bienvenido(a) seleccione una opción válida.");
            }
        },
        [Emergencia, Platica] // Puedes añadir más flujos aquí si es necesario
    );

const main = async () => {
    const adapterFlow = createFlow([welcomeFlow]);

    const adapterProvider = createProvider(Provider);
    const adapterDB = new Database({
        dbUri: "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1",
        dbName: "chatbotTest",
    });

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    httpServer(+PORT);
};

main();
