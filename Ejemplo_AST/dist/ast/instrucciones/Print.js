"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Instruccion");
class Print extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion print, imprime el valor de una expresion en consola
     * @param line linea de la instruccion print
     * @param column columna de la instruccion print
     * @param expresion expresion que se va imprimir
     */
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    execute(ts, arbol) {
        return null;
    }
    translate() {
        return null;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.expresion.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.expresion.generarGrafo(g, nombreHijo);
        return null;
    }
    getNombreHijo() {
        return "PRINT";
    }
}
exports.Print = Print;
//# sourceMappingURL=Print.js.map