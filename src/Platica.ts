import { addKeyword } from '@builderbot/bot';
import { join } from 'path';
import { welcomeFlow } from './app';

// para elegir el numero de la opcion 
const Salir = addKeyword(["3"]).addAnswer(
    "Gracias por utilizarme, vuelve pronto"
);

// Funcion para  platicas personales
const PersonalP = addKeyword(["2"])
    .addAnswer(">Emergencia de muerte")
        .addAnswer(
            [
                 "Si  deseas platicar conmigo por algo personal o algo super x, marcame mejor porque estoy de vaciones"
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
                    return gotoFlow(emergenciasFlow);//para volver al menu inicial de emergencias
                }
                else{
                    return fallBack("Por favor ingrese un numero valido, no sea menso");//por si el usaurio se equivoca de numero se le regresa para que elija una opcion correcta
                }
    });//fin


export const Platica = addKeyword(["1"]).addAnswer(//el numero que esta dentro es para que nos mande a la opcion que queremos visualizar 
    [
        "",
        "  Opciones:",
        "",//espacio entre las opciones 
        "1.- Menu inicial",
        "2.- Platica personal",
        "3- Salir "
    ].join('\n'),
    { capture: true },
    async (ctx, { fallBack,gotoFlow }) => {
        const validOptions = [//validamos que de la opcion que puso si sea valida
            "1", "2","3"//numero de opciones 
        ];

        if(ctx.body === "1"){
            return gotoFlow(welcomeFlow);
        }
        if (!validOptions.includes(ctx.body)) {
            return fallBack(`Seleccione un número de la opción${ctx.name}`);
        }
    },
    [
       PersonalP, Salir
    ]
);//fin
