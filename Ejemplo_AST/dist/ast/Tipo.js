"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type[Type["NUMERIC"] = 0] = "NUMERIC";
    Type[Type["STRING"] = 1] = "STRING";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["VOID"] = 3] = "VOID";
})(Type = exports.Type || (exports.Type = {}));
var TypeOperation;
(function (TypeOperation) {
    TypeOperation[TypeOperation["SUMA"] = 0] = "SUMA";
    TypeOperation[TypeOperation["RESTA"] = 1] = "RESTA";
    TypeOperation[TypeOperation["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TypeOperation[TypeOperation["DIVISION"] = 3] = "DIVISION";
    TypeOperation[TypeOperation["MENOSUNARIO"] = 4] = "MENOSUNARIO";
    TypeOperation[TypeOperation["MAYOR"] = 5] = "MAYOR";
    TypeOperation[TypeOperation["MENOR"] = 6] = "MENOR";
    TypeOperation[TypeOperation["OR"] = 7] = "OR";
    TypeOperation[TypeOperation["AND"] = 8] = "AND";
    TypeOperation[TypeOperation["NOT"] = 9] = "NOT";
})(TypeOperation = exports.TypeOperation || (exports.TypeOperation = {}));
//# sourceMappingURL=Tipo.js.map