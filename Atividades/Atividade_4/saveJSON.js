"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const itens_1 = require("./javascript/itens");
const picareta_de_ferro = new itens_1.Itens('Picareta de Ferro', 1, 'Ferramenta');
const pedrgulho = new itens_1.Itens('Pedregulho', 64, 'Bloco');
const data = [
    { item: picareta_de_ferro, quantidade: 1 },
    { item: pedrgulho, quantidade: 64 }
];
const jsonData = JSON.stringify(data, null, 2);
// Write JSON to a file
fs.writeFile('people.json', jsonData, (err) => {
    if (err) {
        console.error("Error writing file:", err);
    }
    else {
        console.log("File saved successfully as people.json");
    }
});
//# sourceMappingURL=saveJSON.js.map