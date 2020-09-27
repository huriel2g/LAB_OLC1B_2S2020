"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Gramatica = require("../Gramatica/gramatica.js");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
function AnalizarJava(entrada) {
    let codigo = ` 
        numeric a=0.0; 
        string b="hola"; 
        while (a<10.5){
            print(a);
            a = a + 1.0;
        }

    `;
    // Analisis Lexico y Sintactico
    let ast = Gramatica.parse(codigo);
    //Generacion de grafo
    console.log(ast);
    let grafoAST = new GrafoAST_1.GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo();
    console.log(txtDotAST);
    return "exito";
}
exports.AnalizarJava = AnalizarJava;
//# sourceMappingURL=Analisis.js.map