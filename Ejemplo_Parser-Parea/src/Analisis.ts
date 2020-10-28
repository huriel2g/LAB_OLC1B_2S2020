import { Scanner } from "./Scanner/Scanner";
import { Parser } from "./Parser/Parser";

export function AnalizarJava(entrada:string):String{

    entrada = `x=1*3;b2*4;c=5+6/5-2;`;
    // Analisis Lexico y Sintactico

    console.log('---------------------- BEGIN: LEXER ----------------------');
    const aLexico = new Scanner();
    let listaTokens = aLexico.Analizar(entrada);
    console.log(listaTokens);
    console.log('---------------------- END: LEXER ----------------------\n---------------------- BEGIN: PARSER ----------------------');
    const aSintactico = new Parser(listaTokens);
    aSintactico.Analizar();

    console.log('---------------------- END: PARSER ----------------------');

    return "exito";
}