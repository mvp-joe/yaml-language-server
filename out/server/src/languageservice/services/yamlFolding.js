"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoldingRanges = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const yaml_documents_1 = require("../parser/yaml-documents");
function getFoldingRanges(document, context) {
    if (!document) {
        return;
    }
    const result = [];
    const doc = yaml_documents_1.yamlDocumentsCache.getYamlDocument(document);
    for (const ymlDoc of doc.documents) {
        if (doc.documents.length > 1) {
            result.push(createNormalizedFolding(document, ymlDoc.root));
        }
        ymlDoc.visit((node) => {
            if (node.type === 'object' && node.parent?.type === 'array') {
                result.push(createNormalizedFolding(document, node));
            }
            if (node.type === 'property' && node.valueNode) {
                switch (node.valueNode.type) {
                    case 'array':
                    case 'object':
                        result.push(createNormalizedFolding(document, node));
                        break;
                    case 'string': {
                        // check if it is a multi-line string
                        const nodePosn = document.positionAt(node.offset);
                        const valuePosn = document.positionAt(node.valueNode.offset + node.valueNode.length);
                        if (nodePosn.line !== valuePosn.line) {
                            result.push(createNormalizedFolding(document, node));
                        }
                        break;
                    }
                    default:
                        return true;
                }
            }
            return true;
        });
    }
    const rangeLimit = context && context.rangeLimit;
    if (typeof rangeLimit !== 'number' || result.length <= rangeLimit) {
        return result;
    }
    if (context && context.onRangeLimitExceeded) {
        context.onRangeLimitExceeded(document.uri);
    }
    return result.slice(0, context.rangeLimit);
}
exports.getFoldingRanges = getFoldingRanges;
function createNormalizedFolding(document, node) {
    const startPos = document.positionAt(node.offset);
    let endPos = document.positionAt(node.offset + node.length);
    const textFragment = document.getText(vscode_languageserver_types_1.Range.create(startPos, endPos));
    const newLength = textFragment.length - textFragment.trimRight().length;
    if (newLength > 0) {
        endPos = document.positionAt(node.offset + node.length - newLength);
    }
    return vscode_languageserver_types_1.FoldingRange.create(startPos.line, endPos.line, startPos.character, endPos.character);
}
//# sourceMappingURL=yamlFolding.js.map