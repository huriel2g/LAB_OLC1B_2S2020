import { Simbolo } from "./Simbolo"

export class TablaSimbolo{

    tabla:Array<Simbolo>;
    anterior:TablaSimbolo;

    constructor(anterior:TablaSimbolo){
        this.anterior = anterior;
    }

    //Agregando simbolos a mi tabla
    add(simbolo:Simbolo){
        this.tabla.push(simbolo);
    }
    
    // Funcion que verifique si la variable existe

    // Funcion que modifique una variable


}