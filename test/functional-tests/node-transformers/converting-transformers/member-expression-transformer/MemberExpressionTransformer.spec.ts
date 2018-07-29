import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('MemberExpressionTransformer', () => {
    describe('transformation of member expression node with dot notation', () => {
        describe('`stringArray` option is disabled', () => {
            const regExp: RegExp = /var *test *= *console\['log'\];/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/dot-notation-call.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should replace member expression dot notation call with literal value', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('`stringArray` option is enabled', () => {
            const stringArrayRegExp: RegExp = /var *_0x([a-f0-9]){4} *= *\['log'\];/;
            const stringArrayCallRegExp: RegExp = /var *test *= *console\[_0x([a-f0-9]){4}\('0x0'\)\];/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/dot-notation-call.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should add member expression identifier to string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('should replace member expression dot notation call with call to string array', () => {
                assert.match(obfuscatedCode, stringArrayCallRegExp);
            });
        });
    });

    describe('transformation of member expression node with square brackets', () => {
        describe('Variant #1: square brackets literal ', () => {
            const stringArrayRegExp: RegExp = /var *_0x([a-f0-9]){4} *= *\['log'\];/;
            const stringArrayCallRegExp: RegExp = /var *test *= *console\[_0x([a-f0-9]){4}\('0x0'\)\];/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/square-brackets-call.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should add member expression square brackets literal to string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('should replace member expression square brackets identifier with call to string array', () => {
                assert.match(obfuscatedCode, stringArrayCallRegExp);
            });
        });

        describe('Variant #2: square brackets identifier', () => {
            const regExp: RegExp = /var *test *= *console\[identifier\];/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/square-brackets-with-identifier-call.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should ignore square brackets call with identifier value', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });
});
