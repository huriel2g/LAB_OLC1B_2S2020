"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Gramatica = require("../Gramatica/gramatica");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
function AnalizarJava(entrada) {
    console.log("***********************************");
    console.log(entrada);
    console.log("***********************************");
    let codigo = ` 
        numeric a=0.0;
        while(true){ 
            a = "hola"+":)"+59.5*12.2+(10.9*12.12-56.56/0.1);
            print(a+b||c>d);
        }
    `;
    // Analisis Lexico y Sintactico
    let ast = Gramatica.parse(codigo);
    //Generacion de grafo
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST_1.GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo();
    console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(txtDotAST);
    console.log("\n--------------------------------------------\n");
    return nuevoCodigo;
}
exports.AnalizarJava = AnalizarJava;
//# sourceMappingURL=Analisis.js.map