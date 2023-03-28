(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Red Hat, Inc. All rights reserved.
     *  Copyright (c) Adam Voss. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.YAMLFormatter = void 0;
    class YAMLFormatter {
        constructor() {
            this.formatterEnabled = false;
        }
        configure(shouldFormat) {
        }
        format(document, options) {
            return [];
        }
    }
    exports.YAMLFormatter = YAMLFormatter;
});
//# sourceMappingURL=yamlFormatter.js.map