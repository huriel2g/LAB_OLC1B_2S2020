import Gramatica = require('../Gramatica/gramatica.js');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";

export function AnalizarJava(entrada:string):String{

    let codigo = ` 
        numeric a=0.0; 
        string b="hola"; 
        while (a<10.5){
            print(a);
            a = a + 1.0;
        }

    `
    // Analisis Lexico y Sintactico
    let ast = Gramatica.parse(codigo) as AST;
    //Generacion de grafo
    console.log(ast);
    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo()
    console.log(txtDotAST);

    return "exito";
}