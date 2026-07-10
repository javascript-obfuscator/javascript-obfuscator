import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { SourceMapMode } from '../../../src/enums/source-map/SourceMapMode';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1312
//
describe('Issue #1312', () => {
    describe('`sourceMappingURL` should use the provided `sourceMapFileName`', () => {
        describe('Variant #1: `*.min.js.map` file name', () => {
            const sourceMappingUrlRegExp: RegExp = /\/\/# sourceMappingURL=a\.min\.js\.map$/;

            let obfuscatedCode: string;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate("console.log('Hello World');", {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    sourceMap: true,
                    sourceMapMode: SourceMapMode.Separate,
                    sourceMapFileName: 'a.min.js.map'
                }).getObfuscatedCode();
            });

            it('should keep the full `.js.map` file name in the `sourceMappingURL`', () => {
                assert.match(obfuscatedCode, sourceMappingUrlRegExp);
            });
        });

        describe('Variant #2: base name without extension still gets `.js.map`', () => {
            const sourceMappingUrlRegExp: RegExp = /\/\/# sourceMappingURL=a\.js\.map$/;

            let obfuscatedCode: string;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate("console.log('Hello World');", {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    sourceMap: true,
                    sourceMapMode: SourceMapMode.Separate,
                    sourceMapFileName: 'a'
                }).getObfuscatedCode();
            });

            it('should append `.js.map` to a bare file name', () => {
                assert.match(obfuscatedCode, sourceMappingUrlRegExp);
            });
        });
    });
});
