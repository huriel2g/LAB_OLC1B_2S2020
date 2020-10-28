import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";

export function AnalizarJava(entrada:string):String{
    console.log("***********************************")
    console.log(entrada);


    console.log("***********************************")
    let codigo = ` 
        numeric a=0.0;
        while(true){ 
            a = "hola"+":)"+59.5*12.2+(10.9*12.12-56.56/0.1);
            print(a+b||c>d);
        }
    `;
    // Analisis Lexico y Sintactico
    let ast = Gramatica.parse(codigo) as AST;
    //Generacion de grafo
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo()
    console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(txtDotAST);
    console.log("\n--------------------------------------------\n");
    return nuevoCodigo;
}