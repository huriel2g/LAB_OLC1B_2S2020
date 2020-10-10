
let id1: string[]=["hola","adios"];
let id1: ArrayList<String>;

/*
DEC_STATIC_ARRAY -> 'let' id ':' TIPO [ ] '=' EXP_ARRAY         // Static
            | 'let' id ':' TIPO [ EXP ] '=' EXP_ARRAY           // Static
            | 'let' id ':' TIPO [ EXP ] { $$ = new DecArray(....,[],...) }                       // Static
            | 'let' id ':' 'ArrayList' '<' TIPO '>'
            | 'let' id ':' 'ArrayList' '<' TIPO '>' = EXP_ARRAY
            | 'let' id ':' 'ArrayList' '<' TIPO '>' = 'new' 'ArrayList' '<' TIPO '>'  '(' ')' 

EXP_ARRAY -> '[' LISTA_EXP ']'
            | '{' LISTA_EXP '}'

*/ 

class DecArrayStatic extends Instruccion {
    constructor(tipoVar, id, tipoDato, expDim, listExp){
    }


    object ejecutar(ts: Tabla, arbol:AST){
        if(expDim != null){ // 'let' id ':' TIPO [ EXP ] '=' EXP_ARRAY     // Static
            let dimension = expDim.ejecutar() as valor
            if(dimension.valor == listExp.length){
                
                let valorArreglo: ArrayList<any> = new ArrayList<any>; //valor
                Simbolo newArreglo = new Simbolo();
                
                for(var exp of listExp){//Iterando lista expresiones
                    var e = exp.ejecutar(ts,arbol) as Valor;
                    if(e instanceof nodoError || typeof(e) != tipoDato){
                        console.log("error de tipos o en la expreision en la dimension")
                        return null;
                    }
                    valorArreglo.push(e);
                }
                newArreglo.addSimboloArreglo(tipoEstructura.STATIC_ARRAY ,tipoVar, dimension.valor, id, tipoDato, valorArreglo)
                ts.addSimbolo(newArreglo);
            }else{
                console.log("error el la dimension del arreglo estatico")
            }
        }else{              // 'let' id ':' TIPO [ ] '=' EXP_ARRAY         // Static

        let valorArreglo: ArrayList<any> = new ArrayList<any>; //valor
        Simbolo newArreglo = new Simbolo();
            
        for(var exp of listExp){//Iterando lista expresiones
            var e = exp.ejecutar(ts,arbol) as Valor;
            if(e instanceof nodoError || typeof(e) != tipoDato){
                console.log("error de tipos o en la expreision en la dimension")
                return null;
            }
            valorArreglo.push(e);
        }
        newArreglo.addSimboloArreglo(tipoEstructura.STATIC_ARRAY, tipoVar, listExp.length, id, tipoDato, valorArreglo)
        ts.addSimbolo(newArreglo);
        }


    }



}





//------------------------TABLA SIMBOLOS

let valorArreglo: ArrayList<any> = new ArrayList<any>; //valor
let tipoEdd:tipoEstructura = false;
let dimensioArreglo:number = 0;

function addSimboloArreglo (tipoEdd, tipoVar, dimensionArreglo, id, tipoDato, listaDatos){
    this.valorArreglo = listaDatos
    ...
}

enum tipoEstructura{
    PRIMITIVO,
    OBJETO,
    STATIC_ARRAY,
    ARRAYLIST
}



