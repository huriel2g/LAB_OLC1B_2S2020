"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const Token_2 = require("./Token");
class Scanner {
    constructor() {
        this.isLetra = (caracter) => {
            let ascii = caracter.toUpperCase().charCodeAt(0);
            //ASCII A:65 y Z:90
            return ascii > 64 && ascii < 91;
        };
        this.lista_Tokens = [];
    }
    Analizar(entrada) {
        let pos = 0;
        //Iniciando analisis lexico
        this.S0(entrada, 0);
        return this.lista_Tokens;
    }
    S0(entrada, pos) {
        let c = entrada.charAt(pos);
        pos++;
        if (c == '-') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_MENOS, '-'));
            this.S1(entrada, pos);
        }
        else if (c == ';') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_PYCOMA, ';'));
            this.S2(entrada, pos);
        }
        else if (c == '=') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_IGUAL, '='));
            this.S2(entrada, pos);
        }
        else if (this.isNumber(c)) {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_NUMERO, c));
            this.S2(entrada, pos);
        }
        else if (this.isLetra(c)) {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_ID, c));
            this.S2(entrada, pos);
        }
        else {
            console.log("Se encontro error lexico: " + c);
        }
        return;
    }
    S1(entrada, pos) {
        let c = entrada.charAt(pos);
        pos++;
        if (this.isNumber(c)) {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_NUMERO, c));
            this.S2(entrada, pos);
        }
        else {
            console.log("Se encontro error lexico: " + c);
        }
        return;
    }
    S2(entrada, pos) {
        let c = entrada.charAt(pos);
        pos++;
        if (c == '+') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_MAS, c));
            this.S3(entrada, pos);
        }
        else if (c == '-') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_MENOS, c));
            this.S3(entrada, pos);
        }
        else if (c == '*') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_POR, c));
            this.S3(entrada, pos);
        }
        else if (c == '/') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_DIVISION, c));
            this.S3(entrada, pos);
        }
        else if (c == ';') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_PYCOMA, ';'));
            this.S2(entrada, pos);
        }
        else if (c == '=') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_IGUAL, '='));
            this.S2(entrada, pos);
        }
        else if (this.isNumber(c)) {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_NUMERO, c));
            this.S2(entrada, pos);
        }
        else if (this.isLetra(c)) {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_ID, c));
            this.S2(entrada, pos);
        }
        else if (pos >= entrada.length) {
            console.log("Fin del analisis lexico...!!!");
        }
        else {
            console.log("Se encontro error lexico: " + c);
        }
        return;
    }
    S3(entrada, pos) {
        let c = entrada.charAt(pos);
        pos++;
        if (c == '+') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_MAS, c));
            this.S3(entrada, pos);
        }
        else if (c == '-') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_MENOS, c));
            this.S3(entrada, pos);
        }
        else if (c == '*') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_POR, c));
            this.S3(entrada, pos);
        }
        else if (c == '/') {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_DIVISION, c));
            this.S3(entrada, pos);
        }
        else if (this.isNumber(c)) {
            this.lista_Tokens.push(new Token_1.Token(Token_2.TypeToken.T_NUMERO, c));
            this.S2(entrada, pos);
        }
        else {
            console.log("Se encontro error lexico: " + c);
        }
        return;
    }
    isNumber(texto) {
        let numeros = '0123456789';
        for (let i = 0; i < texto.length; i++) {
            if (numeros.indexOf(texto.charAt(i), 0) != -1) {
                return true;
            }
        }
        return false;
    }
}
exports.Scanner = Scanner;
//# sourceMappingURL=Scanner.js.map