import { ValorGrafo } from "./grafo/ValorGrafo";
import { TablaSimbolo } from "./TablaSimbolos";
import { AST } from "./AST";

export abstract class Instruccion{

    public line:Number = 0;
    public column:Number = 0;

    /**
     * 
     * @param line      Linea de la instruccion
     * @param column    Columna de la instruccion
     */
    constructor(line:Number, column:Number){
        this.line = line;
        this.column = column;
    }

    // Metodo en el cual se traduce el codigo
    abstract execute(ts:TablaSimbolo, arbol:AST):any;

    // Metodo en el cual se traduce el codigo
    abstract translate():String;

    // Metodos para la generacion del reporte del grafo
    abstract generarGrafo(g:ValorGrafo, padre:String):any;
    abstract getNombreHijo():String;
    
}

