/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { YAMLSchemaService, } from './services/yamlSchemaService';
import { YAMLDocumentSymbols } from './services/documentSymbols';
import { YAMLHover } from './services/yamlHover';
import { YAMLValidation } from './services/yamlValidation';
import { YAMLFormatter } from './services/yamlFormatter';
import { YamlLinks } from './services/yamlLinks';
import { getFoldingRanges } from './services/yamlFolding';
import { YamlCodeActions } from './services/yamlCodeActions';
import { commandExecutor } from '../languageserver/commandExecutor';
import { doDocumentOnTypeFormatting } from './services/yamlOnTypeFormatting';
import { YamlCodeLens } from './services/yamlCodeLens';
import { registerCommands } from './services/yamlCommands';
import { YamlCompletion } from './services/yamlCompletion';
import { yamlDocumentsCache } from './parser/yaml-documents';
import { JSONSchemaSelection } from '../languageserver/handlers/schemaSelectionHandlers';
import { YamlDefinition } from './services/yamlDefinition';
export var SchemaPriority;
(function (SchemaPriority) {
    SchemaPriority[SchemaPriority["SchemaStore"] = 1] = "SchemaStore";
    SchemaPriority[SchemaPriority["SchemaAssociation"] = 2] = "SchemaAssociation";
    SchemaPriority[SchemaPriority["Settings"] = 3] = "Settings";
})(SchemaPriority || (SchemaPriority = {}));
export function getLanguageService(schemaRequestService, workspaceContext, connection, telemetry, yamlSettings, clientCapabilities) {
    const schemaService = new YAMLSchemaService(schemaRequestService, workspaceContext);
    const completer = new YamlCompletion(schemaService, clientCapabilities, yamlDocumentsCache, telemetry);
    const hover = new YAMLHover(schemaService, telemetry);
    const yamlDocumentSymbols = new YAMLDocumentSymbols(schemaService, telemetry);
    const yamlValidation = new YAMLValidation(schemaService, telemetry);
    const formatter = new YAMLFormatter();
    const yamlCodeActions = new YamlCodeActions(clientCapabilities);
    const yamlCodeLens = new YamlCodeLens(schemaService, telemetry);
    const yamlLinks = new YamlLinks(telemetry);
    const yamlDefinition = new YamlDefinition(telemetry);
    new JSONSchemaSelection(schemaService, yamlSettings, connection);
    // register all commands
    registerCommands(commandExecutor, connection);
    return {
        configure: (settings) => {
            schemaService.clearExternalSchemas();
            if (settings.schemas) {
                schemaService.schemaPriorityMapping = new Map();
                settings.schemas.forEach((settings) => {
                    const currPriority = settings.priority ? settings.priority : 0;
                    schemaService.addSchemaPriority(settings.uri, currPriority);
                    schemaService.registerExternalSchema(settings.uri, settings.fileMatch, settings.schema, settings.name, settings.description, settings.versions);
                });
            }
            yamlValidation.configure(settings);
            hover.configure(settings);
            completer.configure(settings);
            formatter.configure(settings);
            yamlCodeActions.configure(settings);
        },
        registerCustomSchemaProvider: (schemaProvider) => {
            schemaService.registerCustomSchemaProvider(schemaProvider);
        },
        findLinks: yamlLinks.findLinks.bind(yamlLinks),
        doComplete: completer.doComplete.bind(completer),
        doValidation: yamlValidation.doValidation.bind(yamlValidation),
        doHover: hover.doHover.bind(hover),
        findDocumentSymbols: yamlDocumentSymbols.findDocumentSymbols.bind(yamlDocumentSymbols),
        findDocumentSymbols2: yamlDocumentSymbols.findHierarchicalDocumentSymbols.bind(yamlDocumentSymbols),
        doDefinition: yamlDefinition.getDefinition.bind(yamlDefinition),
        resetSchema: (uri) => {
            return schemaService.onResourceChange(uri);
        },
        doFormat: formatter.format.bind(formatter),
        doDocumentOnTypeFormatting,
        addSchema: (schemaID, schema) => {
            return schemaService.saveSchema(schemaID, schema);
        },
        deleteSchema: (schemaID) => {
            return schemaService.deleteSchema(schemaID);
        },
        modifySchemaContent: (schemaAdditions) => {
            return schemaService.addContent(schemaAdditions);
        },
        deleteSchemaContent: (schemaDeletions) => {
            return schemaService.deleteContent(schemaDeletions);
        },
        deleteSchemasWhole: (schemaDeletions) => {
            return schemaService.deleteSchemas(schemaDeletions);
        },
        getFoldingRanges,
        getCodeAction: (document, params) => {
            return yamlCodeActions.getCodeAction(document, params);
        },
        getCodeLens: (document) => {
            return yamlCodeLens.getCodeLens(document);
        },
        resolveCodeLens: (param) => yamlCodeLens.resolveCodeLens(param),
    };
}
//# sourceMappingURL=yamlLanguageService.js.map