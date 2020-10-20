import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo"

export class Print extends Instruccion {
    expresion:Instruccion;
    /** print("hola")
     * @class La instruccion print, imprime el valor de una expresion en consola
     * @param line linea de la instruccion print
     * @param column columna de la instruccion print
     * @param expresion expresion que se va imprimir
     */
    constructor(expresion:Instruccion, line:Number, column:Number){
        super(line,column)
        this.expresion = expresion;
    }

    translate() {
        return "imprimir("+this.expresion.translate()+");\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+ this.expresion.getNombreHijo() +"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.expresion.generarGrafo(g,nombreHijo);
        
        return null;
    }
    getNombreHijo(): String {
        return "PRINT";
    }

}