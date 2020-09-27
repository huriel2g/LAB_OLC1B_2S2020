"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValorGrafo_1 = require("./ValorGrafo");
class GrafoAST {
    constructor(arbol) {
        this.arbol = arbol;
    }
    getGrafo() {
        let grafo = "digraph G{\n\n ";
        grafo += "  nodo0[label=\"AST\"];\n";
        grafo += "  nodo0[label=\"AST\"];\n";
        var g = new ValorGrafo_1.ValorGrafo(1, grafo);
        this.arbol.generarGrafo(g, "nodo0");
        g.grafo += "\n}";
        //console.log(g.grafo);
        return g.grafo;
    }
}
exports.GrafoAST = GrafoAST;
//# sourceMappingURL=GrafoAST.js.map