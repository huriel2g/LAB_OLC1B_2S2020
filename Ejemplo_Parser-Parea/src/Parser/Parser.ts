import { Token } from "../Scanner/Token";
import { TypeToken } from "../Scanner/Token";

export class Parser{
    lista_Tokens:Token[];
    preAnalisis:number;
    pos:number;

    constructor(lista_Tokens:Token[]){
        this.preAnalisis = -1;
        this.pos = 0;
        this.lista_Tokens = lista_Tokens;
    }

    parea (terminal:TypeToken){
        if(this.pos >= this.lista_Tokens.length){
            return;
        }

        if(this.preAnalisis == terminal){
            console.log("token correcto:"+this.lista_Tokens[this.pos].lexema);
            this.pos++;
            if(this.pos < this.lista_Tokens.length){
                this.preAnalisis = this.lista_Tokens[this.pos].token;
            }
        }else{
            console.log("Se encontro error sintactico, no se esperaba: "+ this.preAnalisis.toString()+" val:" + this.lista_Tokens[this.pos].lexema);
            // RECUPERACION DE ERRORES
            while (this.pos < this.lista_Tokens.length) {
                //console.log(this.lista_Tokens[this.pos].token+" == "+TypeToken.T_PYCOMA)    
                if (this.lista_Tokens[this.pos].token == TypeToken.T_PYCOMA 
                    || this.lista_Tokens[this.pos].token == TypeToken.T_LLAVE_DER) {
                    this.pos++;
                    this.preAnalisis = this.lista_Tokens[this.pos].token;
                    break;
                }
                this.pos++;
            }
            if(this.preAnalisis == TypeToken.T_ID){
                this.SENTENCIAS();
            }
        }
    }

    Analizar(){
        //Asignamos el primer token de la lista al simbolo de preAnalisis
        this.preAnalisis = this.lista_Tokens[0].token;
        this.S();
        console.log("Fin del analisis sintactico...!!!")
    }

    /*
    S-> SENTENCIAS
    */
    S(){
        this.SENTENCIAS();
    }

    /*
    SENTENCIAS -> ASIGNACION SENTENCIAS
                | EPSILON
    */
    SENTENCIAS(){
        if(this.preAnalisis == TypeToken.T_ID){
            this.ASIGNACION();
            this.SENTENCIAS();
        }else{
            /*      EPSILON     */
        }
    }

    /*
    ASIGNACION -> id = E ;
    */
    ASIGNACION(){
        this.parea(TypeToken.T_ID);
        this.parea(TypeToken.T_IGUAL);
        this.E();
        this.parea(TypeToken.T_PYCOMA);
    }

    /*
    E -> T E'
    */
    E(){
        this.T();
        this.E_PRIMA();
    }


    /*
    E' -> + T E'
    | - T E'
    | EPSILON
    */
    E_PRIMA(){
        if(this.preAnalisis == TypeToken.T_MAS){
            this.parea(TypeToken.T_MAS);
            this.T();
            this.E_PRIMA();
        } else if(this.preAnalisis == TypeToken.T_MENOS){
            this.parea(TypeToken.T_MENOS);
            this.T();
            this.E_PRIMA();
        } else {
            /*      EPSILON         */
        }
    }

    /*
    T -> F T'
    */
    T(){
        this.F();
        this.T_PRIMA();
    }


    /*
    T' -> * F T'
        | / F T'
        | EPSILON
    */
    T_PRIMA(){        
        if(this.preAnalisis == TypeToken.T_POR){
            this.parea(TypeToken.T_POR);
            this.F();
            this.T_PRIMA();
        } else if(this.preAnalisis == TypeToken.T_DIVISION){
            this.parea(TypeToken.T_DIVISION);
            this.F();
            this.T_PRIMA();
        } else {
            /*      EPSILON         */
        }
    }


    /*
    F -> ( E )
        | num
    */
    F(){
        if(this.preAnalisis == TypeToken.T_PARIZQ){
            this.parea(TypeToken.T_PARIZQ);
            this.E();
            this.parea(TypeToken.T_PARDER);
        } else if(this.preAnalisis == TypeToken.T_NUMERO){
            this.parea(TypeToken.T_NUMERO);
        } else {
            /*      ERROR SINTACTICO         */
            /*console.log("Error Sintactico F: "+this.lista_Tokens[this.pos].lexema);
            this.pos++;
            if(this.pos < this.lista_Tokens.length){
                this.preAnalisis = this.lista_Tokens[this.pos].token;
            }*/
        }
    }


}