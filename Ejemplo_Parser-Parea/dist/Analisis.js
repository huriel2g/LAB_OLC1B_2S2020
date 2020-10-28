"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scanner_1 = require("./Scanner/Scanner");
const Parser_1 = require("./Parser/Parser");
function AnalizarJava(entrada) {
    entrada = `x=1*3;b2*4;c=5+6/5-2;`;
    // Analisis Lexico y Sintactico
    console.log('---------------------- BEGIN: LEXER ----------------------');
    const aLexico = new Scanner_1.Scanner();
    let listaTokens = aLexico.Analizar(entrada);
    console.log(listaTokens);
    console.log('---------------------- END: LEXER ----------------------\n---------------------- BEGIN: PARSER ----------------------');
    const aSintactico = new Parser_1.Parser(listaTokens);
    aSintactico.Analizar();
    console.log('---------------------- END: PARSER ----------------------');
    return "exito";
}
exports.AnalizarJava = AnalizarJava;
//# sourceMappingURL=Analisis.js.map