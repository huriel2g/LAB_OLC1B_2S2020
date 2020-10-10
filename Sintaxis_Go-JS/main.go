package main

import "fmt";

func main() {
  
  fmt.Println("Hola mundo, Lab Compi1 B")
  metodoString();
  fmt.Println("La suma de 5 + 25 es: ")
  fmt.Println(Sumar(5,25));
  fmt.Println("La multiplicacion de 5.5 * 25 es: ")
  fmt.Println(Multiplicar(5.5,25));
  fmt.Println("Hola mundo, Lab Compi1 B")

}


// Comentarios Unilinea
/*
    Comentarios 
    Multilinea
*/

func metodoString(){

  //Varias formas de declarar una variable
  var cad1 string = "Sale"
  cad2 := "Compi1";
  var cad3 = "...!!!"
  nota := 51;

  if nota >= 61 {
    cad1 = "SI " + cad1
  } else {
    cad1 = "NO " + cad1
  }


  fmt.Println(cad1+" "+cad2+cad3);
}

func Sumar(a int, b int) int {
  return a + b;
}

func Multiplicar(a float64, b float64) float64  {
  return a * b;
}

