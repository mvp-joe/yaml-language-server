import { CompletionItem, CompletionItemKind, Diagnostic, DiagnosticSeverity, DocumentSymbol, InsertTextFormat, SymbolKind, SymbolInformation } from 'vscode-languageserver-types';
export declare function createExpectedError(message: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number, severity?: DiagnosticSeverity, source?: string, code?: string | number): Diagnostic;
export declare function createDiagnosticWithData(message: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number, severity: DiagnosticSeverity, source: string, schemaUri: string | string[], data?: Record<string, unknown>): Diagnostic;
export declare function createUnusedAnchorDiagnostic(message: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number): Diagnostic;
export declare function createExpectedSymbolInformation(name: string, kind: SymbolKind, containerName: string | undefined, uri: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number): SymbolInformation;
export declare function createExpectedDocumentSymbol(name: string, kind: SymbolKind, startLine: number, startCharacter: number, endLine: number, endCharacter: number, startLineSelection: number, startCharacterSelection: number, endLineSelection: number, endCharacterSelection: number, children?: DocumentSymbol[], detail?: string): DocumentSymbol;
export declare function createExpectedDocumentSymbolNoDetail(name: string, kind: SymbolKind, startLine: number, startCharacter: number, endLine: number, endCharacter: number, startLineSelection: number, startCharacterSelection: number, endLineSelection: number, endCharacterSelection: number, children?: DocumentSymbol[]): DocumentSymbol;
export declare function createExpectedCompletion(label: string, insertText: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number, kind: CompletionItemKind, insertTextFormat?: InsertTextFormat, extra?: {}): CompletionItem;
