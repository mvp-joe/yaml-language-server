/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Copyright (c) Adam Voss. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { Range, Position, TextEdit, FormattingOptions } from 'vscode-languageserver-types';
import { CustomFormatterOptions, LanguageSettings } from '../yamlLanguageService';
// import * as prettier from 'prettier';
// import { Options } from 'prettier';
// import * as parser from 'prettier/parser-yaml';
import { TextDocument } from 'vscode-languageserver-textdocument';

export class YAMLFormatter {
  private formatterEnabled = false;

  public configure(shouldFormat: LanguageSettings): void {
  }

  public format(document: TextDocument, options: FormattingOptions & CustomFormatterOptions): TextEdit[] {
    return []
  }
}
