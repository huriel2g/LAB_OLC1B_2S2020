"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Instruccion");
class Primitivo extends Instruccion_1.Instruccion {
    /**
     * @class La clase Primitivo almacena el valor real (numero|cadena|booleano)
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param valor valor real
     */
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(ts, arbol) {
        return null;
    }
    translate() {
        return null;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.valor.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PRIMITIVO";
    }
}
exports.Primitivo = Primitivo;
//# sourceMappingURL=Primitivo.js.map