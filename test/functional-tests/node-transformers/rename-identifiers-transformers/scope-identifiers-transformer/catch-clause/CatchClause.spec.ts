import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../../helpers/readFileAsString';
import { stubNodeTransformers } from '../../../../../helpers/stubNodeTransformers';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';
import { ObjectPatternPropertiesTransformer } from '../../../../../../src/node-transformers/converting-transformers/ObjectPatternPropertiesTransformer';

describe('ScopeIdentifiersTransformer CatchClause identifiers', () => {
    let obfuscatedCode: string;

    describe('Variant #1: base transform of catch clause parameter', () => {
        const paramNameRegExp: RegExp = /catch *\((_0x([a-f0-9]){4,6})\) *\{/;
        const bodyParamNameRegExp: RegExp = /console\['log'\]\((_0x([a-f0-9]){4,6})\);/;

        let firstMatch: string | undefined,
            secondMatch: string | undefined;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
            firstMatch = getRegExpMatch(obfuscatedCode, paramNameRegExp);
            secondMatch = getRegExpMatch(obfuscatedCode, bodyParamNameRegExp);
        });

        it('match #1: should transform catch clause node', () => {
            assert.match(obfuscatedCode, paramNameRegExp);
        });

        it('match #2: should transform catch clause node', () => {
            assert.match(obfuscatedCode, bodyParamNameRegExp);
        });

        it('catch clause arguments param name and param name in body should be same', () => {
            assert.equal(firstMatch, secondMatch);
        });
    });

    describe('Variant #2: object pattern as parameter', () => {
        stubNodeTransformers([ObjectPatternPropertiesTransformer]);

        const functionParameterMatch: RegExp = /\} *catch *\(\{ *name *\}\) *\{/;
        const functionBodyMatch: RegExp = /return *name;/;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-pattern-as-parameter.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('match #1: shouldn\'t transform function parameter object pattern identifier', () => {
            assert.match(obfuscatedCode, functionParameterMatch);
        });

        it('match #2: shouldn\'t transform function parameter object pattern identifier', () => {
            assert.match(obfuscatedCode, functionBodyMatch);
        });
    });

    describe('Variant #3: optional catch binding support', () => {
        const optionalCatchClauseRegExp: RegExp = /} *catch *\{/;
        const bodyParamNameRegExp: RegExp = /console\['log'\]\(0x1\);/;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/optional-catch-binding.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('match #1: should transform catch clause node', () => {
            assert.match(obfuscatedCode, optionalCatchClauseRegExp);
        });

        it('match #2: should transform catch clause node', () => {
            assert.match(obfuscatedCode, bodyParamNameRegExp);
        });
    });

    describe('Variant #4: global variable scope', () => {
        describe('Variant #1: `renameGlobals` is disabled', () => {
            const globalVariableRegExp: RegExp = /var test *= *0x1;/;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/global-variable-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('match #1: shouldn\'t transform variable identifier if `renameGlobals` option is disabled', () => {
                assert.match(obfuscatedCode, globalVariableRegExp);
            });
        });

        describe('Variant #2: `renameGlobals` is enabled', () => {
            const globalVariableRegExp: RegExp = /var _0x([a-f0-9]){4,6} *= *0x1;/;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/global-variable-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should transform variable identifier if `renameGlobals` option is enabled', () => {
                assert.match(obfuscatedCode, globalVariableRegExp);
            });
        });
    });
});
