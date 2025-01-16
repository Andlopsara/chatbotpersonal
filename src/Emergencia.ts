import { addKeyword } from '@builderbot/bot';
import { join } from 'path';
import { welcomeFlow } from './welcome';

// para elegir el numero de la opcion 
const Salir = addKeyword(["4"]).addAnswer(
    "Gracias por utilizarme, vuelve pronto"
);
// Funcion para  Emergencia de chismes
const ChismeE = addKeyword(["3"])
    .addAnswer(">Emergencia de  por chisme")//titulo
        .addAnswer(
            [
                 "Si tu emergencia es por un chisme marcame para que me lo cuentes mejor , con todo y detalles por favor."
            ]
            //addAnswer para recibir la respuesta
        ).addAnswer("", null, async (_, { state, flowDynamic  }) => { //en dado caso de que el usuario haya terminado o quiera continuar con la conversacion del bot 
            await flowDynamic(
            [
                    "¿Sería todo?",
                    "1️.- Si, quiero regresar al menú",
                    "2️.-No, finaliza la conversación"
            ].join('\n'));//unimos los elementos y damos un salto de linea como html
        })
    .addAnswer('Ingrese el número para ver la opción que desea realizar', { capture: true }, async (ctx, { state,endFlow, gotoFlow, fallBack }) => {//en dado caso de ser verdad se hará esto para que le permita al usaurio ver lo que solicito 
            if(ctx.body === "2"){//Despedida en caso de seleccionar la segund opcion 
            return endFlow("Bye, vuelva pronto")
                }else if(ctx.body === "1"){
                    return gotoFlow(Emergencia);//para volver al menu inicial de emergencias
                }
                else{
                    return fallBack("Por favor ingrese un numero valido, no sea menso");//por si el usaurio se equivoca de numero se le regresa para que elija una opcion correcta
                }
    });//fin

// Funcion para  Emergencia de muerte
const MuerteE = addKeyword(["2"])
    .addAnswer(">Emergencia de muerte")
        .addAnswer(
            [
                 "Si tu emergencia es una defunción o te estas muriendo por una alergia no me mandes mensaje mejor marcame al numero 446 10 8 80 65, llama 3 veces porque el telefono en esta en vibración "
            ]
            //addAnwer para recibir la respuesta
        ).addAnswer("", null, async (_, { state, flowDynamic  }) => { //en dado caso de que el usuario haya terminado o quiera continuar con la conversacion del bot 
            await flowDynamic(
            [
                    "¿Sería todo?",
                    "1️.- Si, quiero regresar al menú",
                    "2️.-No, finaliza la conversación"
            ].join('\n'));//unimos los elementos y damos un salto de linea como html
        })
    .addAnswer('Ingrese el número para ver la opción que desea realizar', { capture: true }, async (ctx, { state,endFlow, gotoFlow, fallBack }) => {//en dado caso de ser verdad se hará esto para que le permita al usaurio ver lo que solicito 
            if(ctx.body === "2"){//Despedida en caso de seleccionar la segund opcion 
            return endFlow("Bye, vuelva pronto")
                }else if(ctx.body === "1"){
                    return gotoFlow(Emergencia);//para volver al menu inicial de emergencias
                }
                else{
                    return fallBack("Por favor ingrese un numero valido, no sea menso");//por si el usaurio se equivoca de numero se le regresa para que elija una opcion correcta
                }
    });//fin


//para que nos muestre el submenu o para que nos regrese al menu inicial
export const Emergencia= addKeyword(["1"]).addAnswer(//el numero que esta dentro es para que nos mande a la opcion que queremos visualizar 
    [
        "",
        "  Opciones:",
        "",
        "1.- Menu inicial",
        "2.- Emergencia de muerte",
        "3.- Emergencia de chisme",
        "4- Salir "
    ].join('\n'),
    { capture: true },
    async (ctx, { fallBack,gotoFlow }) => {
        const validOptions = [
            "1", "2","3","4"//numero de opciones 
        ];

        if(ctx.body === "1"){
            return gotoFlow(welcomeFlow);
        }
        if (!validOptions.includes(ctx.body)) {
            return fallBack(`Seleccione un número de la opción${ctx.name}`);
        }
    },
    [
        ChismeE,MuerteE, Salir
    ]
);//fin
