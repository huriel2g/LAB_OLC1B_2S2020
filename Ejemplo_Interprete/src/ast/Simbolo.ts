import { Type } from "../ast/Tipo";
export class Simbolo{

    /*
    int a = 0;
    string b = "";
    boolean c = true;
    char d = 'q';
    */

    id:String;
    tipo: Type;
    valor: any;

    constructor(id:String, tipo: Type, valor: any){
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }



}