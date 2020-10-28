"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Instruccion");
class Identificador extends Instruccion_1.Instruccion {
    /**
     * @class La Identificador, almacena el id de la variable a la que se esta accesando
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param id identificador de la variable a la que se accesa
     */
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    translate() {
        return this.id;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "IDENTIFICADOR";
    }
}
exports.Identificador = Identificador;
//# sourceMappingURL=Identificador.js.map