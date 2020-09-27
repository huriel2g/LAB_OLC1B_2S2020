"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class AST extends Instruccion_1.Instruccion {
    constructor(instrucciones) {
        super(0, 0);
        this.instrucciones = instrucciones;
    }
    execute(ts, arbol) {
        return null;
    }
    translate() {
        return null;
    }
    generarGrafo(g, padre) {
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
        //----------------------------------------------
    }
    getNombreHijo() {
        throw new Error("Method not implemented.");
    }
}
exports.AST = AST;
//# sourceMappingURL=AST.js.map