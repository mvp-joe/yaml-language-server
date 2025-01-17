(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../languageservice/parser/isKubernetes", "../../languageservice/utils/arrUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValidationHandler = void 0;
    const isKubernetes_1 = require("../../languageservice/parser/isKubernetes");
    const arrUtils_1 = require("../../languageservice/utils/arrUtils");
    class ValidationHandler {
        constructor(connection, languageService, yamlSettings) {
            this.connection = connection;
            this.languageService = languageService;
            this.yamlSettings = yamlSettings;
            this.yamlSettings.documents.onDidChangeContent((change) => {
                this.validate(change.document);
            });
            this.yamlSettings.documents.onDidClose((event) => {
                this.cleanPendingValidation(event.document);
                this.connection.sendDiagnostics({ uri: event.document.uri, diagnostics: [] });
            });
        }
        validate(textDocument) {
            this.cleanPendingValidation(textDocument);
            this.yamlSettings.pendingValidationRequests[textDocument.uri] = setTimeout(() => {
                delete this.yamlSettings.pendingValidationRequests[textDocument.uri];
                this.validateTextDocument(textDocument);
            }, this.yamlSettings.validationDelayMs);
        }
        cleanPendingValidation(textDocument) {
            const request = this.yamlSettings.pendingValidationRequests[textDocument.uri];
            if (request) {
                clearTimeout(request);
                delete this.yamlSettings.pendingValidationRequests[textDocument.uri];
            }
        }
        validateTextDocument(textDocument) {
            if (!textDocument) {
                return;
            }
            return this.languageService
                .doValidation(textDocument, (0, isKubernetes_1.isKubernetesAssociatedDocument)(textDocument, this.yamlSettings.specificValidatorPaths))
                .then((diagnosticResults) => {
                const diagnostics = [];
                for (const diagnosticItem of diagnosticResults) {
                    // Convert all warnings to errors
                    if (diagnosticItem.severity === 2) {
                        diagnosticItem.severity = 1;
                    }
                    diagnostics.push(diagnosticItem);
                }
                const removeDuplicatesDiagnostics = (0, arrUtils_1.removeDuplicatesObj)(diagnostics);
                this.connection.sendDiagnostics({
                    uri: textDocument.uri,
                    diagnostics: removeDuplicatesDiagnostics,
                });
                return removeDuplicatesDiagnostics;
            });
        }
    }
    exports.ValidationHandler = ValidationHandler;
});
//# sourceMappingURL=validationHandlers.js.map