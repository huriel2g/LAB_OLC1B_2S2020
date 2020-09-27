"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Instruccion");
class Declaracion extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(type, id, valor, line, column) {
        super(line, column);
        this.id = id;
        this.type = type;
        this.valor = valor;
    }
    execute(ts, arbol) {
        return null;
    }
    translate() {
        return null;
    }
    generarGrafo(g, padre) {
        //Tipo
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + this.type.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        let padreHijo = nombreHijo;
        //Identificador
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.valor != null) {
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.valor.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.valor.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "DECLARACION";
    }
}
exports.Declaracion = Declaracion;
//# sourceMappingURL=Declaracion.js.map