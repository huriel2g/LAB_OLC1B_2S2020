import { AST } from "../AST";
import { ValorGrafo } from "./ValorGrafo";
export class GrafoAST{
    arbol:AST;
    constructor(arbol:AST){
        this.arbol = arbol;
    }


    getGrafo():String{
        let grafo = "digraph G{\n\n ";        
        grafo += "  nodo0[label=\"AST\"];\n";
        var g = new ValorGrafo(1, grafo);
        this.arbol.generarGrafo(g,"nodo0");
        
        g.grafo += "\n}";
        
        //console.log(g.grafo);
        return g.grafo;
    }

    
    


}