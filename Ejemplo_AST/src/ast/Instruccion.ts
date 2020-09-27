import { TablaSimbolos } from '../ast/TablaSimbolos';
import { AST } from '../ast/AST';
import { ValorGrafo } from "./grafo/ValorGrafo"

export abstract class Instruccion{

    public line:Number = 0;
    public column:Number = 0;
    
    constructor(line:Number, column:Number){

    }

    abstract execute(ts:TablaSimbolos, arbol:AST):any;
    abstract translate():any;
    //Para generar el ast
    abstract generarGrafo(g:ValorGrafo, padre:String):any;
    abstract getNombreHijo():String;
    
}

