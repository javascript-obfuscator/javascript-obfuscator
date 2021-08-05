import 'reflect-metadata';

import format from 'string-template';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../../../src/container/ServiceIdentifiers';

import { ICryptUtilsStringArray } from '../../../../../../src/interfaces/utils/ICryptUtilsStringArray';
import { IInversifyContainerFacade } from '../../../../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscationResult } from '../../../../../../src/interfaces/source-code/IObfuscationResult';
import { IRandomGenerator } from '../../../../../../src/interfaces/utils/IRandomGenerator';

import { AtobTemplate } from '../../../../../../src/custom-code-helpers/string-array/templates/string-array-calls-wrapper/AtobTemplate';
import { Rc4Template } from '../../../../../../src/custom-code-helpers/string-array/templates/string-array-calls-wrapper/Rc4Template';
import { StringArrayBase64DecodeTemplate } from '../../../../../../src/custom-code-helpers/string-array/templates/string-array-calls-wrapper/StringArrayBase64DecodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../../../../../src/custom-code-helpers/string-array/templates/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRC4DecodeTemplate } from '../../../../../../src/custom-code-helpers/string-array/templates/string-array-calls-wrapper/StringArrayRC4DecodeTemplate';
import { StringArrayTemplate } from '../../../../../../src/custom-code-helpers/string-array/templates/string-array/StringArrayTemplate';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { InversifyContainerFacade } from '../../../../../../src/container/InversifyContainerFacade';
import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';
import { minimizeCode } from '../../../../../helpers/minimizeCode';
import { readFileAsString } from '../../../../../helpers/readFileAsString';
import { swapLettersCase } from '../../../../../helpers/swapLettersCase';

describe('StringArrayCallsWrapperTemplate', () => {
    const stringArrayName: string = 'stringArrayName';
    const stringArrayFunctionName: string = 'stringArrayFunctionName';
    const stringArrayCallsWrapperName: string = 'stringArrayCallsWrapperName';
    const stringArrayCacheName: string = 'stringArrayCache';
    const atobFunctionName: string = 'atob';
    const rc4FunctionName: string = 'rc4';

    let cryptUtilsSwappedAlphabet: ICryptUtilsStringArray,
        randomGenerator: IRandomGenerator;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtilsSwappedAlphabet = inversifyContainerFacade
            .get<ICryptUtilsStringArray>(ServiceIdentifiers.ICryptUtilsStringArray);
        randomGenerator = inversifyContainerFacade
            .get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator);
    });

    describe('Variant #1: `base64` encoding', () => {
        describe('Variant #1: `selfDefending` option is disabled', () => {
            const selfDefendingEnabled: boolean = false;

            describe('Variant #1: index shift amount is `0`', () => {
                const index: string = '0x0';

                const indexShiftAmount: number = 0;

                const expectedDecodedValue: string = 'test1';

                let decodedValue: string;

                before(() => {
                    const stringArrayTemplate = format(StringArrayTemplate(), {
                        stringArrayName,
                        stringArrayFunctionName,
                        stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa('test1')}'`
                    });
                    const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                        atobFunctionName
                    });
                    const atobDecodeTemplate: string = format(
                        StringArrayBase64DecodeTemplate(randomGenerator),
                        {
                            atobPolyfill,
                            atobFunctionName,
                            selfDefendingCode: '',
                            stringArrayCacheName,
                            stringArrayCallsWrapperName
                        }
                    );
                    const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                        decodeCodeHelperTemplate: atobDecodeTemplate,
                        indexShiftAmount,
                        stringArrayCacheName,
                        stringArrayCallsWrapperName,
                        stringArrayFunctionName
                    });

                    decodedValue = Function(`
                        ${stringArrayTemplate}
                    
                        ${stringArrayCallsWrapperTemplate}
                        
                        return ${stringArrayCallsWrapperName}(${index});
                    `)();
                });

                it('should correctly return decoded value', () => {
                    assert.deepEqual(decodedValue, expectedDecodedValue);
                });
            });

            describe('Variant #2: index shift amount is `5`', () => {
                const index: string = '0x5';

                const indexShiftAmount: number = 5;

                const expectedDecodedValue: string = 'test1';

                let decodedValue: string;

                before(() => {
                    const stringArrayTemplate = format(StringArrayTemplate(), {
                        stringArrayName,
                        stringArrayFunctionName,
                        stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa('test1')}'`
                    });
                    const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                        atobFunctionName
                    });
                    const atobDecodeTemplate: string = format(
                        StringArrayBase64DecodeTemplate(randomGenerator),
                        {
                            atobPolyfill,
                            atobFunctionName,
                            selfDefendingCode: '',
                            stringArrayCacheName,
                            stringArrayCallsWrapperName
                        }
                    );
                    const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                        decodeCodeHelperTemplate: atobDecodeTemplate,
                        indexShiftAmount,
                        stringArrayCacheName,
                        stringArrayCallsWrapperName,
                        stringArrayFunctionName
                    });

                    decodedValue = Function(`
                        ${stringArrayTemplate}
                    
                        ${stringArrayCallsWrapperTemplate}
                        
                        return ${stringArrayCallsWrapperName}(${index});
                    `)();
                });

                it('should correctly return decoded value', () => {
                    assert.deepEqual(decodedValue, expectedDecodedValue);
                });
            });

            describe('Variant #3: no regexp inside atob template', () => {
                const indexShiftAmount: number = 0;

                const expectedRegExpTestValue: string = '12345';

                let decodedValue: string;

                before(() => {
                    const stringArrayTemplate = format(StringArrayTemplate(), {
                        stringArrayName,
                        stringArrayFunctionName,
                        stringArrayStorageItems: `'${swapLettersCase('c3RyaQ==')}'`
                    });
                    const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                        atobFunctionName
                    });
                    const atobDecodeTemplate: string = format(
                        StringArrayBase64DecodeTemplate(randomGenerator),
                        {
                            atobPolyfill,
                            atobFunctionName,
                            selfDefendingCode: '',
                            stringArrayCacheName,
                            stringArrayCallsWrapperName
                        }
                    );
                    const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                        decodeCodeHelperTemplate: atobDecodeTemplate,
                        indexShiftAmount,
                        stringArrayCacheName,
                        stringArrayCallsWrapperName,
                        stringArrayFunctionName
                    });

                    decodedValue = Function(`
                        ${stringArrayTemplate}
                    
                        ${stringArrayCallsWrapperTemplate}
                        
                        /(.+)/.test("12345");
                        ${stringArrayCallsWrapperName}(0x0);
                                        
                        return RegExp.$1;
                    `)();
                });

                it('should correctly return RegExp.$1 match without mutation by atob template', () => {
                    assert.deepEqual(decodedValue, expectedRegExpTestValue);
                });
            });
        });

        describe('Variant #2: `selfDefending` option is enabled', () => {
            const selfDefendingEnabled: boolean = true;

            describe('Variant #1: correct code evaluation for single-line code', () => {
                describe('Variant #1: long decoded string', () => {
                    const index: string = '0x0';

                    const indexShiftAmount: number = 0;

                    const expectedDecodedValue: string = 'test1test1';

                    let decodedValue: string;

                    before(async() => {
                        const stringArrayTemplate = format(StringArrayTemplate(), {
                            stringArrayName,
                            stringArrayFunctionName,
                            stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa('test1test1')}'`
                        });
                        const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                            atobFunctionName
                        });
                        const atobDecodeTemplate: string = format(
                            StringArrayBase64DecodeTemplate(randomGenerator),
                            {
                                atobPolyfill,
                                atobFunctionName,
                                selfDefendingCode: '',
                                stringArrayCacheName,
                                stringArrayCallsWrapperName
                            }
                        );
                        const stringArrayCallsWrapperTemplate: string = await minimizeCode(
                            format(StringArrayCallsWrapperTemplate(), {
                                decodeCodeHelperTemplate: atobDecodeTemplate,
                                indexShiftAmount,
                                stringArrayCacheName,
                                stringArrayCallsWrapperName,
                                stringArrayFunctionName
                            })
                        );

                        decodedValue = Function(`
                            ${stringArrayTemplate}
                        
                            ${stringArrayCallsWrapperTemplate}
                            
                            return ${stringArrayCallsWrapperName}(${index});
                        `)();
                    });

                    it('should correctly return decoded value', () => {
                        assert.deepEqual(decodedValue, expectedDecodedValue);
                    });
                });

                describe('Variant #2: 3-characters decoded string', () => {
                    const index: string = '0x0';

                    const indexShiftAmount: number = 0;

                    const expectedDecodedValue: string = 'foo';

                    let decodedValue: string;

                    before(async() => {
                        const stringArrayTemplate = format(StringArrayTemplate(), {
                            stringArrayName,
                            stringArrayFunctionName,
                            stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa('foo')}'`
                        });
                        const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                            atobFunctionName
                        });
                        const atobDecodeTemplate: string = format(
                            StringArrayBase64DecodeTemplate(randomGenerator),
                            {
                                atobPolyfill,
                                atobFunctionName,
                                selfDefendingCode: '',
                                stringArrayCacheName,
                                stringArrayCallsWrapperName
                            }
                        );
                        const stringArrayCallsWrapperTemplate: string = await minimizeCode(
                            format(StringArrayCallsWrapperTemplate(), {
                                decodeCodeHelperTemplate: atobDecodeTemplate,
                                indexShiftAmount,
                                stringArrayCacheName,
                                stringArrayCallsWrapperName,
                                stringArrayFunctionName
                            })
                        );

                        decodedValue = Function(`
                            ${stringArrayTemplate}
                        
                            ${stringArrayCallsWrapperTemplate}
                            
                            return ${stringArrayCallsWrapperName}(${index});
                        `)();
                    });

                    it('should correctly return decoded value', () => {
                        assert.deepEqual(decodedValue, expectedDecodedValue);
                    });
                });
            });

            describe('Variant #2: invalid code evaluation for multi-line code', () => {
                describe('Variant #1: long decoded string', () => {
                    const index: string = '0x0';

                    const indexShiftAmount: number = 0;

                    const expectedDecodedValue: string = 'test18est1';

                    let decodedValue: string;

                    before(() => {
                        const stringArrayTemplate = format(StringArrayTemplate(), {
                            stringArrayName,
                            stringArrayFunctionName,
                            stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa('test1test1')}'`
                        });
                        const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                            atobFunctionName
                        });
                        const atobDecodeTemplate: string = format(
                            StringArrayBase64DecodeTemplate(randomGenerator),
                            {
                                atobPolyfill,
                                atobFunctionName,
                                selfDefendingCode: '',
                                stringArrayCacheName,
                                stringArrayCallsWrapperName
                            }
                        );
                        const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                            decodeCodeHelperTemplate: atobDecodeTemplate,
                            indexShiftAmount,
                            stringArrayCacheName,
                            stringArrayCallsWrapperName,
                            stringArrayFunctionName
                        });

                        decodedValue = Function(`
                            ${stringArrayTemplate}
                        
                            ${stringArrayCallsWrapperTemplate}
                            
                            return ${stringArrayCallsWrapperName}(${index});
                        `)();
                    });

                    it('should return invalid decoded value', () => {
                        assert.deepEqual(decodedValue, expectedDecodedValue);
                    });
                });

                describe('Variant #2: 3-characters decoded string', () => {
                    const index: string = '0x0';

                    const indexShiftAmount: number = 0;

                    const expectedDecodedValue: string = 'foo';

                    let decodedValue: string;

                    before(() => {
                        const stringArrayTemplate = format(StringArrayTemplate(), {
                            stringArrayName,
                            stringArrayFunctionName,
                            stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa('foo')}'`
                        });
                        const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                            atobFunctionName
                        });
                        const atobDecodeTemplate: string = format(
                            StringArrayBase64DecodeTemplate(randomGenerator),
                            {
                                atobPolyfill,
                                atobFunctionName,
                                selfDefendingCode: '',
                                stringArrayCacheName,
                                stringArrayCallsWrapperName
                            }
                        );
                        const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                            decodeCodeHelperTemplate: atobDecodeTemplate,
                            indexShiftAmount,
                            stringArrayCacheName,
                            stringArrayCallsWrapperName,
                            stringArrayFunctionName
                        });

                        decodedValue = Function(`
                            ${stringArrayTemplate}
                        
                            ${stringArrayCallsWrapperTemplate}
                            
                            return ${stringArrayCallsWrapperName}(${index});
                        `)();
                    });

                    it('should return invalid decoded value', () => {
                        assert.deepEqual(decodedValue, expectedDecodedValue);
                    });
                });
            });
        });
    });

    describe('Variant #2: `rc4` encoding', () => {
        describe('Variant #1: `selfDefending` option is disabled', () => {
            const selfDefendingEnabled: boolean = false;

            describe('Variant #1: index shift amount is `0`', () => {
                const index: string = '0x0';
                const key: string = 'key';

                const indexShiftAmount: number = 0;

                const expectedDecodedValue: string = 'test1';

                let decodedValue: string;

                before(() => {
                    const stringArrayTemplate = format(StringArrayTemplate(), {
                        stringArrayName,
                        stringArrayFunctionName,
                        stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa(cryptUtilsSwappedAlphabet.rc4('test1', key))}'`
                    });
                    const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                        atobFunctionName
                    });
                    const rc4Polyfill = format(Rc4Template(), {
                        atobFunctionName,
                        rc4FunctionName
                    });
                    const rc4decodeCodeHelperTemplate: string = format(
                        StringArrayRC4DecodeTemplate(randomGenerator),
                        {
                            atobPolyfill,
                            rc4Polyfill,
                            rc4FunctionName,
                            selfDefendingCode: '',
                            stringArrayCacheName,
                            stringArrayCallsWrapperName
                        }
                    );
                    const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                        decodeCodeHelperTemplate: rc4decodeCodeHelperTemplate,
                        indexShiftAmount,
                        stringArrayCacheName,
                        stringArrayCallsWrapperName,
                        stringArrayFunctionName
                    });

                    decodedValue = Function(`
                        ${stringArrayTemplate}
                    
                        ${stringArrayCallsWrapperTemplate}
                        
                        return ${stringArrayCallsWrapperName}('${index}', '${key}');
                    `)();
                });

                it('should correctly return decoded value', () => {
                    assert.deepEqual(decodedValue, expectedDecodedValue);
                });
            });

            describe('Variant #2: index shift amount is `5`', () => {
                const index: string = '0x5';
                const key: string = 'key';

                const indexShiftAmount: number = 5;

                const expectedDecodedValue: string = 'test1';

                let decodedValue: string;

                before(() => {
                    const stringArrayTemplate = format(StringArrayTemplate(), {
                        stringArrayName,
                        stringArrayFunctionName,
                        stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa(cryptUtilsSwappedAlphabet.rc4('test1', key))}'`
                    });
                    const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                        atobFunctionName
                    });
                    const rc4Polyfill = format(Rc4Template(), {
                        atobFunctionName,
                        rc4FunctionName
                    });
                    const rc4decodeCodeHelperTemplate: string = format(
                        StringArrayRC4DecodeTemplate(randomGenerator),
                        {
                            atobPolyfill,
                            rc4Polyfill,
                            rc4FunctionName,
                            selfDefendingCode: '',
                            stringArrayCacheName,
                            stringArrayCallsWrapperName
                        }
                    );
                    const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                        decodeCodeHelperTemplate: rc4decodeCodeHelperTemplate,
                        indexShiftAmount,
                        stringArrayCacheName,
                        stringArrayCallsWrapperName,
                        stringArrayFunctionName
                    });

                    decodedValue = Function(`
                        ${stringArrayTemplate}
                    
                        ${stringArrayCallsWrapperTemplate}
                        
                        return ${stringArrayCallsWrapperName}('${index}', '${key}');
                    `)();
                });

                it('should correctly return decoded value', () => {
                    assert.deepEqual(decodedValue, expectedDecodedValue);
                });
            });
        });

        describe('Variant #2: `selfDefending` option is enabled', () => {
            const selfDefendingEnabled: boolean = true;

            describe('Variant #1: correct code evaluation for single-line code', () => {
                describe('Variant #1: long decoded string', () => {
                    const index: string = '0x0';
                    const key: string = 'key';

                    const indexShiftAmount: number = 0;

                    const expectedDecodedValue: string = 'test1';

                    let decodedValue: string;

                    before(async() => {
                        const stringArrayTemplate = format(StringArrayTemplate(), {
                            stringArrayName,
                            stringArrayFunctionName,
                            stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa(cryptUtilsSwappedAlphabet.rc4('test1', key))}'`
                        });
                        const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                            atobFunctionName
                        });
                        const rc4Polyfill = format(Rc4Template(), {
                            atobFunctionName,
                            rc4FunctionName
                        });
                        const rc4decodeCodeHelperTemplate: string = format(
                            StringArrayRC4DecodeTemplate(randomGenerator),
                            {
                                atobPolyfill,
                                rc4Polyfill,
                                rc4FunctionName,
                                selfDefendingCode: '',
                                stringArrayCacheName,
                                stringArrayCallsWrapperName
                            }
                        );
                        const stringArrayCallsWrapperTemplate: string = await minimizeCode(
                            format(StringArrayCallsWrapperTemplate(), {
                                decodeCodeHelperTemplate: rc4decodeCodeHelperTemplate,
                                indexShiftAmount,
                                stringArrayCacheName,
                                stringArrayCallsWrapperName,
                                stringArrayFunctionName
                            })
                        );

                        console.log(stringArrayCallsWrapperTemplate);

                        decodedValue = Function(`
                            ${stringArrayTemplate}
                        
                            ${stringArrayCallsWrapperTemplate}
                            
                            return ${stringArrayCallsWrapperName}('${index}', '${key}');
                        `)();
                    });

                    it('should correctly return decoded value', () => {
                        assert.deepEqual(decodedValue, expectedDecodedValue);
                    });
                });
            });

            describe('Variant #2: invalid code evaluation for multi-line code', () => {
                describe('Variant #1: long decoded string', () => {
                    const index: string = '0x0';
                    const key: string = 'key';

                    const indexShiftAmount: number = 0;

                    const expectedDecodedValue: string = 'test\u001c';

                    let decodedValue: string;

                    before(() => {
                        const stringArrayTemplate = format(StringArrayTemplate(), {
                            stringArrayName,
                            stringArrayFunctionName,
                            stringArrayStorageItems: `'${cryptUtilsSwappedAlphabet.btoa(cryptUtilsSwappedAlphabet.rc4('test1', key))}'`
                        });
                        const atobPolyfill = format(AtobTemplate(selfDefendingEnabled), {
                            atobFunctionName
                        });
                        const rc4Polyfill = format(Rc4Template(), {
                            atobFunctionName,
                            rc4FunctionName
                        });
                        const rc4decodeCodeHelperTemplate: string = format(
                            StringArrayRC4DecodeTemplate(randomGenerator),
                            {
                                atobPolyfill,
                                rc4Polyfill,
                                rc4FunctionName,
                                selfDefendingCode: '',
                                stringArrayCacheName,
                                stringArrayCallsWrapperName
                            }
                        );
                        const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                            decodeCodeHelperTemplate: rc4decodeCodeHelperTemplate,
                            indexShiftAmount,
                            stringArrayCacheName,
                            stringArrayCallsWrapperName,
                            stringArrayFunctionName
                        });

                        decodedValue = Function(`
                            ${stringArrayTemplate}
                        
                            ${stringArrayCallsWrapperTemplate}
                            
                            return ${stringArrayCallsWrapperName}('${index}', '${key}');
                        `)();
                    });

                    it('should correctly return decoded value', () => {
                        assert.deepEqual(decodedValue, expectedDecodedValue);
                    });
                });
            });
        });
    });

    describe('Prevailing kind of variables', () => {
        describe('`var` kind', () => {
            let obfuscatedCode: string,
                stringArrayCallsWrapperVariableRegExp: RegExp = /var (_0x(\w){4,6}) *= *(_0x(\w){4,6})\[(_0x(\w){4,6})];/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-var.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array calls wrapper code', () => {
                assert.match(obfuscatedCode, stringArrayCallsWrapperVariableRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });

        describe('`const` kind', () => {
            let obfuscatedCode: string,
                stringArrayCallsWrapperVariableRegExp: RegExp = /let (_0x(\w){4,6}) *= *(_0x(\w){4,6})\[(_0x(\w){4,6})];/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array calls wrapper code', () => {
                assert.match(obfuscatedCode, stringArrayCallsWrapperVariableRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });

        describe('`let` kind', () => {
            let obfuscatedCode: string,
                stringArrayCallsWrapperVariableRegExp: RegExp = /let (_0x(\w){4,6}) *= *(_0x(\w){4,6})\[(_0x(\w){4,6})];/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-let.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array calls wrapper code', () => {
                assert.match(obfuscatedCode, stringArrayCallsWrapperVariableRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });
    });
});
