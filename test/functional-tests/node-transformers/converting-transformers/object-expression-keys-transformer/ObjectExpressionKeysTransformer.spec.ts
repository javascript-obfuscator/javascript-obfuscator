import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ObjectExpressionKeysTransformer', () => {
    const variableMatch: string = '_0x([a-f0-9]){4,6}';

    describe('transformation of object keys', () => {
        describe('variant #1: simple', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{};` +
                `${variableMatch}\\['foo'] *= *'bar';` +
                `${variableMatch}\\['baz'] *= *'bark';` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('variant #2: nested objects #1', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{};` +
                `${variableMatch}\\['foo'] *= *'bar';` +
                `${variableMatch}\\['inner'] *= *{};` +
                `${variableMatch}\\['inner']\\['inner1'] *= *{};` +
                `${variableMatch}\\['inner']\\['inner1']\\['baz'] *= *'bark';` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/nested-objects-1.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('variant #3: nested objects #2', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{};` +
                `${variableMatch}\\['foo'] *= *'bar';` +
                `${variableMatch}\\['inner'] *= *{};` +
                `${variableMatch}\\['ball'] *= *'door';` +
                `${variableMatch}\\['inner']\\['baz'] *= *'bark';` +
                `${variableMatch}\\['inner']\\['inner1'] *= *{};` +
                `${variableMatch}\\['inner']\\['cow'] *= *'bear';` +
                `${variableMatch}\\['inner']\\['inner1']\\['hawk'] *= *'geek';` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/nested-objects-2.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('variant #4: correct integration with control flow flattening object', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{};` +
                `${variableMatch}\\['\\w{5}'] *= *function *${variableMatch} *\\(${variableMatch}, *${variableMatch}\\) *{` +
                    `return *${variableMatch} *\\+ *${variableMatch};` +
                `};` +
                `var *${variableMatch} *= *${variableMatch}\\['\\w{5}']\\(0x1, *0x2\\);` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/integration-with-control-flow-flattening.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });
    });

    describe('correct placement of expression statements', () => {
        describe('variant #1: if statement', () => {
            const match: string = `` +
                `if *\\(!!\\[]\\) *{` +
                    `var *${variableMatch} *= *{};` +
                    `${variableMatch}\\['foo'] *= *'bar';` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/placement-inside-if-statement.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('variant #2: try statement', () => {
            const match: string = `` +
                `try *{` +
                    `var *${variableMatch} *= *{};` +
                    `${variableMatch}\\['foo'] *= *'bar';` +
                `} *catch *\\(${variableMatch}\\) *{` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/placement-inside-try-statement.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('variant #3: catch clause statement', () => {
            const match: string = `` +
                `try *{` +
                `} *catch *\\(${variableMatch}\\) *{` +
                    `var *${variableMatch} *= *{};` +
                    `${variableMatch}\\['foo'] *= *'bar';` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/placement-inside-catch-clause.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('variant #4: switch catch statement', () => {
            const match: string = `` +
                `switch *\\(!!\\[]\\) *{` +
                    `case *!!\\[]:` +
                        `var *${variableMatch} *= *{};` +
                        `${variableMatch}\\['foo'] *= *'bar';` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/placement-inside-switch-case.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });
    });

    describe('Ignore transformation', () => {
        describe('variant #1: disabled option', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{` +
                    `'foo': *'bar',` +
                    `'baz': *'bark'` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('shouldn\'t transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('variant #2: variable declaration without initialization', () => {
            const match: string = `` +
                `var *${variableMatch};` +
                `${variableMatch} *= *{` +
                    `'foo': *'bar',` +
                    `'baz': *'bark'` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/variable-declaration-without-initialization.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('shouldn\'t transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });
    });
});
