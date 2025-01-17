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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./languageservice/yamlLanguageService", "vscode-json-languageservice", "vscode-languageserver-types"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getJSONLanguageService = void 0;
    __exportStar(require("./languageservice/yamlLanguageService"), exports);
    var vscode_json_languageservice_1 = require("vscode-json-languageservice");
    Object.defineProperty(exports, "getJSONLanguageService", { enumerable: true, get: function () { return vscode_json_languageservice_1.getLanguageService; } });
    __exportStar(require("vscode-languageserver-types"), exports);
});
//# sourceMappingURL=index.js.map