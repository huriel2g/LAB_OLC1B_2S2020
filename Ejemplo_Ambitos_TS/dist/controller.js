"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Analisis_1 = require("./Analisis");
exports.analizar = (req, res) => {
    //console.log("query: ",req.query.codigo)
    let codigo = req.query.codigo;
    //let respuesta = codigo;
    let respuesta = Analisis_1.AnalizarJava(codigo);
    //console.log(respuesta);
    //console.log("params: ",req.params)
    let a = [{ 'analisis': respuesta }, { 'grafo': 'reporteAST' }, { 'errores': 'reporteErrores' }];
    res.send(a);
};
/*
{
    codigo: "class id { ... }"
}
*/
exports.miAuxiliar = (req, res) => {
    console.log("params: ", req.params);
    res.send("no me motiva a echarle ganas al curso :'v");
};
//# sourceMappingURL=controller.js.map