import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { RenamePropertiesMode } from '../../../../../src/enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('RenamePropertiesTransformer', () => {
    describe('transformNode', () => {
        describe('Mode: `unsafe`', () => {
            describe('Variant #1: Hexadecimal identifier names generator', () => {
                describe('Variant #1: object properties rename', () => {
                    const property1RegExp: RegExp = /'(_0x[a-f0-9]{4,6})': *0x1/;
                    const property2RegExp: RegExp = /'(_0x[a-f0-9]{4,6})': *0x2/;
                    const property3RegExp: RegExp = /\['(_0x[a-f0-9]{4,6})']: *0x3/;
                    const property4RegExp: RegExp = /\[hawk]: *0x4/;


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/base.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                            }
                        ).getObfuscatedCode();
                    });

                    it('Match #1: should rename property', () => {
                        assert.match(obfuscatedCode, property1RegExp);
                    });

                    it('Match #2: should rename property', () => {
                        assert.match(obfuscatedCode, property2RegExp);
                    });

                    it('Match #3: should rename property', () => {
                        assert.match(obfuscatedCode, property3RegExp);
                    });

                    it('Match #4: should rename property', () => {
                        assert.match(obfuscatedCode, property4RegExp);
                    });
                });

                describe('Variant #2: class property definitions rename', () => {
                    const propertyDefinition1RegExp: RegExp = /\['(_0x[a-f0-9]{4,6})'] *= *0x1;/;
                    const propertyDefinition2RegExp: RegExp = /static \['(_0x[a-f0-9]{4,6})'] *= *0x2/;
                    const propertyDefinition3RegExp: RegExp = /\['(_0x[a-f0-9]{4,6})'] *= *0x3/;
                    const propertyDefinition4RegExp: RegExp = /\[hawk] *= *0x4/;

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/property-definition-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                            }
                        ).getObfuscatedCode();
                    });

                    it('Match #1: should rename property definition', () => {
                        assert.match(obfuscatedCode, propertyDefinition1RegExp);
                    });

                    it('Match #2: should rename property definition', () => {
                        assert.match(obfuscatedCode, propertyDefinition2RegExp);
                    });

                    it('Match #3: should rename property definition', () => {
                        assert.match(obfuscatedCode, propertyDefinition3RegExp);
                    });

                    it('Match #4: should rename property definition', () => {
                        assert.match(obfuscatedCode, propertyDefinition4RegExp);
                    });
                });
            });

            describe('Variant #2: Mangled identifier names generator', () => {
                describe('Variant #1: object properties mangle', () => {
                    const property1RegExp: RegExp = /'a': *0x1/;
                    const property2RegExp: RegExp = /'b': *0x2/;
                    const property3RegExp: RegExp = /\['c']: *0x3/;
                    const property4RegExp: RegExp = /\[hawk]: *0x4/;


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/base.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                            }
                        ).getObfuscatedCode();
                    });

                    it('Match #1: should rename property', () => {
                        assert.match(obfuscatedCode, property1RegExp);
                    });

                    it('Match #2: should rename property', () => {
                        assert.match(obfuscatedCode, property2RegExp);
                    });

                    it('Match #3: should rename property', () => {
                        assert.match(obfuscatedCode, property3RegExp);
                    });

                    it('Match #4: should rename property', () => {
                        assert.match(obfuscatedCode, property4RegExp);
                    });
                });

                describe('Variant #2: class property definitions rename', () => {
                    const propertyDefinition1RegExp: RegExp = /\['a'] *= *0x1;/;
                    const propertyDefinition2RegExp: RegExp = /static \['b'] *= *0x2/;
                    const propertyDefinition3RegExp: RegExp = /\['c'] *= *0x3/;
                    const propertyDefinition4RegExp: RegExp = /\[hawk] *= *0x4/;

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/property-definition-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                            }
                        ).getObfuscatedCode();
                    });

                    it('Match #1: should rename property definition', () => {
                        assert.match(obfuscatedCode, propertyDefinition1RegExp);
                    });

                    it('Match #2: should rename property definition', () => {
                        assert.match(obfuscatedCode, propertyDefinition2RegExp);
                    });

                    it('Match #3: should rename property definition', () => {
                        assert.match(obfuscatedCode, propertyDefinition3RegExp);
                    });

                    it('Match #4: should rename property definition', () => {
                        assert.match(obfuscatedCode, propertyDefinition4RegExp);
                    });
                });

                describe('Variant #3: base properties rename with rename globals', () => {
                    const variable1RegExp: RegExp = /const d *= *'hawk'/;
                    const variable2RegExp: RegExp = /const e *= *{/;
                    const property1RegExp: RegExp = /'a': *0x1/;
                    const property2RegExp: RegExp = /'b': *0x2/;
                    const property3RegExp: RegExp = /\['c']: *0x3/;
                    const property4RegExp: RegExp = /\[d]: *0x4/;


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/base.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                renameGlobals: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('Match #1: should rename variable name', () => {
                        assert.match(obfuscatedCode, variable1RegExp);
                    });

                    it('Match #2: should rename variable name', () => {
                        assert.match(obfuscatedCode, variable2RegExp);
                    });

                    it('Match #3: should rename property', () => {
                        assert.match(obfuscatedCode, property1RegExp);
                    });

                    it('Match #4: should rename property', () => {
                        assert.match(obfuscatedCode, property2RegExp);
                    });

                    it('Match #5: should rename property', () => {
                        assert.match(obfuscatedCode, property3RegExp);
                    });

                    it('Match #6: should rename property', () => {
                        assert.match(obfuscatedCode, property4RegExp);
                    });
                });

                describe('Variant #4: properties rename of nested objects', () => {
                    const regExp: RegExp = new RegExp('' +
                        'const foo *= *{' +
                            '\'a\': *{' +
                                '\'b\': *0x1' +
                            '}' +
                        '};' +
                        'const bar *= *foo\\[\'a\']\\[\'b\'];' +
                    '');

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/nested-objects.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                            }
                        ).getObfuscatedCode();
                    });

                    it('Should rename property', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #5: properties rename of rest element', () => {
                    const regExp: RegExp = new RegExp('' +
                        'const foo *= *{' +
                            '\'a\': *0x1' +
                        '};' +
                        'const \\{a: *bar} *= *foo;' +
                        'const baz *= *bar;' +
                    '');

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/rest-element.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                            }
                        ).getObfuscatedCode();
                    });

                    it('Should rename property', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #6: reserved dom properties', () => {
                    const regExp: RegExp = new RegExp('' +
                        'const foo *= *{' +
                            '\'a\': *0x1,' +
                            '\'join\': *0x2,' +
                            '\'b\': *0x3,' +
                            '\'c\': *0x4' +
                        '};' +
                        'const baz *= *foo\\[\'a\'] *\\+ *foo\\[\'join\'] *\\+ *foo\\[\'b\'] *\\+ *foo\\[\'c\'];' +
                    '');

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/reserved-properties.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                            }
                        ).getObfuscatedCode();
                    });

                    it('Should rename non-reserved properties', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #7: reserved names properties', () => {
                    const regExp: RegExp = new RegExp('' +
                        'const foo *= *{' +
                            '\'a\': *0x1,' +
                            '\'join\': *0x2,' +
                            '\'reserved\': *0x3,' +
                            '\'private_\': *0x4' +
                        '};' +
                        'const baz *= *foo\\[\'a\'] *\\+ *foo\\[\'join\'] *\\+ *foo\\[\'reserved\'] *\\+ *foo\\[\'private_\'];' +
                    '');

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/reserved-properties.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                reservedNames: ['^reserved$', '_$']
                            }
                        ).getObfuscatedCode();
                    });

                    it('Should rename non-reserved properties', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #8: class methods', () => {
                    const regExp: RegExp = new RegExp('' +
                        'class Foo *{' +
                            '\\[\'a\'] *\\(\\) *{}' +
                        '}' +
                        'const foo *= *new Foo\\(\\);' +
                        'foo\\[\'a\']\\(\\);' +
                    '');

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/class-methods.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                reservedNames: ['^reserved$', '_$']
                            }
                        ).getObfuscatedCode();
                    });

                    it('Should rename class method name', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #9: integration with `splitStrings` option', () => {
                    const propertyRegExp: RegExp = new RegExp(
                        'const foo *= *{' +
                            '\'a\': *\'long\' *\\+ *\'Prop\' *\\+ *\'erty\' *\\+ *\'Valu\' *\\+ *\'e\'' +
                        '};' +
                        'foo\\[\'a\'];'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/split-strings-integration.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                splitStrings: true,
                                splitStringsChunkLength: 4
                            }
                        ).getObfuscatedCode();
                    });

                    it('Should rename property before `splitStrings` option will applied', () => {
                        assert.match(obfuscatedCode, propertyRegExp);
                    });
                });

                describe('Variant #10: integration with `controlFlowFlattening` option', () => {
                    const propertyRegExp: RegExp = new RegExp(
                        'const b *= *{ *' +
                            '\'\\w{5}\' *: *\'a\' *' +
                        '}; *' +
                        'const c *= *{' +
                            '\'a\': *0x1' +
                        '};' +
                        'c\\[b\\[\'\\w{5}\']];'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/control-flow-flattening-integration.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                controlFlowFlattening: true,
                                controlFlowFlatteningThreshold: 1
                            }
                        ).getObfuscatedCode();
                    });

                    it('Should correctly rename property when `controlFlowFlattening` option is enabled', () => {
                        assert.match(obfuscatedCode, propertyRegExp);
                    });
                });

                describe('Variant #11: integration with `transformObjectKeys` option', () => {
                    const propertyRegExp: RegExp = new RegExp(
                        'const b *= *{}; *' +
                        'b\\[\'a\'] *= *0x1;' +
                        'const foo *= *b;' +
                        'foo\\[\'a\'];'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/transform-object-keys-integration.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                transformObjectKeys: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('Should correctly rename property when `transformObjectKeys` option is enabled', () => {
                        assert.match(obfuscatedCode, propertyRegExp);
                    });
                });
            });

            describe('Variant #3: Ignored literal node type', () => {
                describe('Variant #1: boolean literal node', () => {
                    const regExp: RegExp = /var obj *= *{}; *obj\[!!\[]] *= *0x1;/;

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/boolean-literal-node.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameProperties: true,
                                renamePropertiesMode: RenamePropertiesMode.Unsafe
                            }
                        ).getObfuscatedCode();
                    });

                    it('Match #1: should skip literal property with invalid type', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('Variant #4: Prevent generation of the property names that are equal to the existing object property names', () => {
                const regExp: RegExp = /var object *= *{'b': *'field', *'c': *'value'};/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/duplicated-generated-names-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameProperties: true,
                            renamePropertiesMode: RenamePropertiesMode.Unsafe,
                            identifierNamesGenerator: 'mangled',
                            reservedNames: ['^a$']
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should skip literal property with invalid type', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });

        describe('Mode: `safe`', () => {
            describe('Variant #1: base properties rename', () => {
                const declarationsRegExp: RegExp = new RegExp('' +
                    'const object *= *{' +
                        '\'foo\': *0x1, *' +
                        '\'a\': *0x2 *' +
                    '}; *' +
                    'class Class *{ *' +
                        '\\[\'baz\'] *= *0x1; *' +
                        'static *\\[\'b\'] *= *0x2;*' +
                        'static *\\[\'hawk\'] *\\(\\) *{} *' +
                        'static *\\[\'c\'] *\\(\\) *{} *' +
                    '}' +
                '');
                const referencesRegExp: RegExp = new RegExp('' +
                    'console\\[\'log\']\\(' +
                        'object\\[\'foo\'], *' +
                        'object\\[\'a\'], *' +
                        'Class\\[\'baz\'], *' +
                        'Class\\[\'b\'], *' +
                        'Class\\[\'hawk\'], *' +
                        'Class\\[\'c\'] *' +
                    '\\);' +
                '');

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/safe-mode.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameProperties: true,
                            renamePropertiesMode: RenamePropertiesMode.Safe,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                        }
                    ).getObfuscatedCode();
                });

                it('Should rename property declarations', () => {
                    assert.match(obfuscatedCode, declarationsRegExp);
                });

                it('Should rename property references', () => {
                    assert.match(obfuscatedCode, referencesRegExp);
                });
            });

            describe('Variant #2: Prevent generation of the property names that are equal to the existing object property names', () => {
                const regExp: RegExp = /var object *= *{'b': *'field', *'c': *'value'};/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/duplicated-generated-names-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameProperties: true,
                            renamePropertiesMode: RenamePropertiesMode.Safe,
                            identifierNamesGenerator: 'mangled',
                            reservedNames: ['^a$']
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should skip literal property with invalid type', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });

        describe('Property identifier names from property identifier names cache', () => {
            describe('Variant #1: no property identifier names in the cache', () => {
                const property1RegExp: RegExp = /'(_0x[a-f0-9]{4,6})': *0x1/;
                const property2RegExp: RegExp = /'(_0x[a-f0-9]{4,6})': *0x2/;
                const property3RegExp: RegExp = /'(_0x[a-f0-9]{4,6})': *0x3/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/property-identifier-names-cache.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameProperties: true,
                            identifierNamesCache: {
                                globalIdentifiers: {},
                                propertyIdentifiers: {}
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should rename property', () => {
                    assert.match(obfuscatedCode, property1RegExp);
                });

                it('Match #2: should rename property', () => {
                    assert.match(obfuscatedCode, property2RegExp);
                });

                it('Match #3: should rename property', () => {
                    assert.match(obfuscatedCode, property3RegExp);
                });
            });

            describe('Variant #2: existing property identifier names in the cache', () => {
                const property1RegExp: RegExp = /'bar_from_cache': *0x1/;
                const property2RegExp: RegExp = /'baz_from_cache': *0x2/;
                const property3RegExp: RegExp = /'(_0x[a-f0-9]{4,6})': *0x3/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/property-identifier-names-cache.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameProperties: true,
                            identifierNamesCache: {
                                globalIdentifiers: {},
                                propertyIdentifiers: {
                                    bar: 'bar_from_cache',
                                    baz: 'baz_from_cache'
                                }
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should rename property based on the cache value', () => {
                    assert.match(obfuscatedCode, property1RegExp);
                });

                it('Match #2: should rename property based on the cache value', () => {
                    assert.match(obfuscatedCode, property2RegExp);
                });

                it('Match #3: should rename property', () => {
                    assert.match(obfuscatedCode, property3RegExp);
                });
            });

            describe('Variant #3: existing property identifier names in the cache, reserved name is defined', () => {
                const property1RegExp: RegExp = /'bar_from_cache': *0x1/;
                const property2RegExp: RegExp = /'baz': *0x2/;
                const property3RegExp: RegExp = /'(_0x[a-f0-9]{4,6})': *0x3/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/property-identifier-names-cache.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameProperties: true,
                            identifierNamesCache: {
                                globalIdentifiers: {},
                                propertyIdentifiers: {
                                    bar: 'bar_from_cache',
                                    baz: 'baz_from_cache'
                                }
                            },
                            reservedNames: ['^baz$']
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should rename property based on the cache value', () => {
                    assert.match(obfuscatedCode, property1RegExp);
                });

                it('Match #2: should keep original property name', () => {
                    assert.match(obfuscatedCode, property2RegExp);
                });

                it('Match #3: should rename property', () => {
                    assert.match(obfuscatedCode, property3RegExp);
                });
            });
        });
    });
});
