import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getStringArrayRegExp } from '../../../../helpers/get-string-array-regexp';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ClassFieldTransformer', () => {
    describe('Variant #1: `MethodDefinition` node', () => {
        describe('Variant #1: identifier key', () => {
            describe('Variant #1: default behaviour', () => {
                const regExp: RegExp = /\['bar'\]\(\)\{\}/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/identifier-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('should replace method definition node `key` property with square brackets literal', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: `stringArray` option is enabled', () => {
                const stringArrayRegExp: RegExp = getStringArrayRegExp(['property', 'bar']);
                const stringArrayCallRegExp: RegExp = /\[_0x([a-f0-9]){4}\(0x1\)\]\(\)\{\}/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/identifier-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add method definition node `key` property to string array', () => {
                    assert.match(obfuscatedCode,  stringArrayRegExp);
                });

                it('should replace method definition node `key` property with call to string array', () => {
                    assert.match(obfuscatedCode,  stringArrayCallRegExp);
                });
            });

            describe('Variant #3: `constructor` key', () => {
                const regExp: RegExp = /constructor\(\)\{\}/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/identifier-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('shouldn\'t transform method definition node with `constructor` key', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });

        describe('Variant #2: literal key', () => {
            describe('Variant #1: Default behaviour', () => {
                const regExp: RegExp = /\['bar'\]\(\)\{\}/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/literal-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('should replace method definition node `key` property with square brackets literal', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: `stringArray` option is enabled', () => {
                const stringArrayRegExp: RegExp = getStringArrayRegExp(['property', 'constructor', 'bar']);
                const stringArrayCallRegExp: RegExp = /\[_0x([a-f0-9]){4}\(0x2\)\]\(\)\{\}/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/literal-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add method definition node `key` property to string array', () => {
                    assert.match(obfuscatedCode,  stringArrayRegExp);
                });

                it('should replace method definition node `key` property with call to string array', () => {
                    assert.match(obfuscatedCode,  stringArrayCallRegExp);
                });
            });

            describe('Variant #3: `constructor` key', () => {
                const regExp: RegExp = /'constructor'\(\)\{\}/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/literal-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('shouldn\'t transform method definition node with `constructor` key', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });

        describe('Variant #3: async `get()` method', () => {
            const classDeclarationRegExp: RegExp = /class *(_0x[a-f0-9]{4,6}) *{/;
            const asyncMethodRegExp: RegExp = /static *async *\['get'] *\(\) *{}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/async-get-method.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: should rename class declaration name', () => {
                assert.match(obfuscatedCode, classDeclarationRegExp);
            });

            it('Match #2: should correctly rename async method name', () => {
                assert.match(obfuscatedCode, asyncMethodRegExp);
            });
        });
    });

    describe('Variant #2: `PropertyDefinition` node', () => {
        describe('Variant #1: identifier key', () => {
            describe('Variant #1: default behaviour', () => {
                const regExp: RegExp = /\['property'\] *= *0x1;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/identifier-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('should replace property definition node `key` property with square brackets literal', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: `stringArray` option is enabled', () => {
                const stringArrayRegExp: RegExp = getStringArrayRegExp(['property', 'bar']);
                const stringArrayCallRegExp: RegExp = /\[_0x([a-f0-9]){4}\(0x0\)\] *= *0x1;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/identifier-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add property definition node `key` property to string array', () => {
                    assert.match(obfuscatedCode,  stringArrayRegExp);
                });

                it('should replace property definition node `key` property with call to string array', () => {
                    assert.match(obfuscatedCode,  stringArrayCallRegExp);
                });
            });
        });

        describe('Variant #2: literal key', () => {
            describe('Variant #1: Default behaviour', () => {
                const regExp: RegExp = /\['property'\] *= *0x1;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/literal-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('should replace property definition node `key` property with square brackets literal', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: `stringArray` option is enabled', () => {
                const stringArrayRegExp: RegExp = getStringArrayRegExp(['property', 'constructor', 'bar']);
                const stringArrayCallRegExp: RegExp = /\[_0x([a-f0-9]){4}\(0x0\)\] *= *0x1;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/literal-key.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add property definition node `key` property to string array', () => {
                    assert.match(obfuscatedCode,  stringArrayRegExp);
                });

                it('should replace property definition node `key` property with call to string array', () => {
                    assert.match(obfuscatedCode,  stringArrayCallRegExp);
                });
            });
        });

        describe('Variant #3: async `property` method', () => {
            const classDeclarationRegExp: RegExp = /class *(_0x[a-f0-9]{4,6}) *{/;
            const asyncMethodRegExp: RegExp = /static \['property'] *= *async *\(\) *=> *{}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/async-get-method.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: should rename class declaration name', () => {
                assert.match(obfuscatedCode, classDeclarationRegExp);
            });

            it('Match #2: should correctly rename async property method name', () => {
                assert.match(obfuscatedCode, asyncMethodRegExp);
            });
        });
    });
});
