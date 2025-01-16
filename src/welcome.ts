//librerias para mandar llamar a las diferentes opciones que se le dan al usuario

import { addKeyword, EVENTS } from '@builderbot/bot';
import { Emergencia } from './Emergencia';
import {  Platica } from './Platica';

//funcion para despetir al usuario 
const Salir = addKeyword(["3"]).addAnswer(
    "¡Hasta luego! Vuelva pronto"
);

export const welcomeFlow = addKeyword(["Hola", "hola", "hi", "hello","Margot"])

    .addAnswer(">¡Hola! Soy Margot, la asistente virtual de Andrea, por el momento esta de vaciones.")
    .addAnswer(
        [
            "  Opciones para hablar con Andrea",
            "",//espacio
            "1️.- Emergencia",
            "2.- Platica",
            "3.- Salir"
        ].join('\n'),
        {  capture: true },
        async (ctx, { fallBack }) => {
            const validOptions = [
                "1", "2","3"
            ];

            if (!validOptions.includes(ctx.body)) {
                return fallBack("Bienvenido(a) seleccione una opción");
            }
        },
        [//declaramos variables o cerramos que mandamos cerrar las opciones: preguntarle a kevin?
            Emergencia,Platica, Salir
        ]
    );
