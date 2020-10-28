"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.default.listen(server_1.default.get('port'));
console.log('Server in port: ', server_1.default.get('port'));
//# sourceMappingURL=index.js.map