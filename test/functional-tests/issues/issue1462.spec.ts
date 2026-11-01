import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1462
//
describe('Issue #1462', () => {
    describe('Identifiers inside functions nested in class field initializers should be renamed', () => {
        describe('Variant #1: arrow function inside a static field initializer', () => {
            const code: string = `
                function register (options) {
                    return options;
                }

                class Foo {
                    static staticField = register({
                        onChange: (b) => {
                            return b['value'] + b['suffix'];
                        }
                    });
                }

                module.exports = Foo.staticField.onChange({ value: 'foo', suffix: 'bar' });
            `;

            let result: string;

            before(() => {
                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    stringArrayWrappersCount: 1,
                    stringArrayWrappersChainedCalls: false
                }).getObfuscatedCode();

                const moduleExports: { exports: string } = { exports: '' };
                new Function('module', obfuscatedCode)(moduleExports);
                result = moduleExports.exports;
            });

            it('should obfuscate the nested function without a runtime error', () => {
                assert.equal(result, 'foobar');
            });
        });

        describe('Variant #2: arrow function inside an instance field initializer', () => {
            const code: string = `
                function register (options) {
                    return options;
                }

                class Foo {
                    instanceField = register({
                        onChange: (b) => {
                            return b['value'] + b['suffix'];
                        }
                    });
                }

                module.exports = new Foo().instanceField.onChange({ value: 'foo', suffix: 'bar' });
            `;

            let result: string;

            before(() => {
                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    stringArrayWrappersCount: 1,
                    stringArrayWrappersChainedCalls: false
                }).getObfuscatedCode();

                const moduleExports: { exports: string } = { exports: '' };
                new Function('module', obfuscatedCode)(moduleExports);
                result = moduleExports.exports;
            });

            it('should obfuscate the nested function without a runtime error', () => {
                assert.equal(result, 'foobar');
            });
        });
    });
});
