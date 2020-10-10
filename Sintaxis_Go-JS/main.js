console.log('Hola mundo, Lab Compi1 B');

// Comentarios Unilinea
/*
    Comentarios 
    Multilinea
*/

console.log("Hola mundo, Lab Compi1 B")
metodoString();
console.log("La suma de 5 + 25 es: ")
console.log(Sumar(5,25));
console.log("La multiplicacion de 5.5 * 25 es: ")
console.log(Multiplicar(5.5,25));
console.log("Hola mundo, Lab Compi1 B")



function metodoString(){
    //Varias formas de declarar una variable
    let cad1 = "Sale"
    cad2 = "Compi1";
    var cad3 = "...!!!"
    nota = 51;
  
    if (nota >= 61) {
      cad1 = "SI " + cad1
    } else {
      cad1 = "NO " + cad1
    }
  
    console.log(cad1+" "+cad2+cad3);
}
  
function Sumar(a, b){
    return a + b;
}
  
function Multiplicar(a, b) {
    return a * b;
}
  