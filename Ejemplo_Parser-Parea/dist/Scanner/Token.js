"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeToken;
(function (TypeToken) {
    TypeToken[TypeToken["T_MAS"] = 0] = "T_MAS";
    TypeToken[TypeToken["T_MENOS"] = 1] = "T_MENOS";
    TypeToken[TypeToken["T_POR"] = 2] = "T_POR";
    TypeToken[TypeToken["T_DIVISION"] = 3] = "T_DIVISION";
    TypeToken[TypeToken["T_NUMERO"] = 4] = "T_NUMERO";
    TypeToken[TypeToken["T_ID"] = 5] = "T_ID";
    TypeToken[TypeToken["T_IGUAL"] = 6] = "T_IGUAL";
    TypeToken[TypeToken["T_PARIZQ"] = 7] = "T_PARIZQ";
    TypeToken[TypeToken["T_PARDER"] = 8] = "T_PARDER";
    TypeToken[TypeToken["T_PYCOMA"] = 9] = "T_PYCOMA";
    TypeToken[TypeToken["T_LLAVE_DER"] = 10] = "T_LLAVE_DER";
})(TypeToken = exports.TypeToken || (exports.TypeToken = {}));
class Token {
    constructor(token, lexema) {
        this.token = token;
        this.lexema = lexema;
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map