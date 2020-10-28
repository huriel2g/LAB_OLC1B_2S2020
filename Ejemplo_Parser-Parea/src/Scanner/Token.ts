export enum TypeToken{
    T_MAS,
    T_MENOS,
    T_POR,
    T_DIVISION,
    T_NUMERO,
    T_ID,
    T_IGUAL,
    T_PARIZQ,
    T_PARDER,
    T_PYCOMA,
    T_LLAVE_DER
}

export class Token {
    
    token:TypeToken;
    lexema:String;

    constructor(token:TypeToken, lexema:String){
        this.token = token;
        this.lexema = lexema;
    }
}