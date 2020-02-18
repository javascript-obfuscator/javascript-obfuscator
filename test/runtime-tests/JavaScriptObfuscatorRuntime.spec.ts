import { assert } from 'chai';

import { TInputOptions } from '../../src/types/options/TInputOptions';

import { StringArrayEncoding } from '../../src/enums/StringArrayEncoding';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { evaluateInWorker } from '../helpers/evaluateInWorker';
import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscatorFacade';

const getEnvironmentCode = () => `
    global.document = {
        domain: 'obfuscator.io'
    };
`;
const NODE_MAJOR_VERSION: number = parseInt(process.versions.node.split('.')[0], 10);

describe('JavaScriptObfuscator runtime eval', function () {
    const baseOptions: TInputOptions = {
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        disableConsoleOutput: true,
        domainLock: ['obfuscator.io'],
        reservedNames: ['generate', 'sha256'],
        rotateStringArray: true,
        selfDefending: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayEncoding: StringArrayEncoding.Rc4,
        stringArrayThreshold: 1,
        transformObjectKeys: true,
        unicodeEscapeSequence: true
    };

    this.timeout(200000);

    [
        {
            identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
            renameGlobals: false
        },
        {
            identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
            renameGlobals: true
        },
        {
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
            renameGlobals: false
        },
        {
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
            renameGlobals: true
        }
    ].forEach((options: Partial<TInputOptions>) => {
        const detailedDescription: string = `Identifier names generator: ${options.identifierNamesGenerator}, rename globals: ${options.renameGlobals?.toString()}`;

        describe(`Astring. ${detailedDescription}`, () => {
            it('should obfuscate code without any runtime errors after obfuscation: Variant #1 astring', () => {
                const code: string = readFileAsString(__dirname + '/fixtures/astring.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...baseOptions,
                        ...options
                    }
                ).getObfuscatedCode();

                let evaluationResult: string;

                try {
                    evaluationResult = eval(`
                        ${getEnvironmentCode()}
                        ${obfuscatedCode}
                        const code = generate({
                            "type": "Program",
                            "body": [
                                {
                                    "type": "FunctionDeclaration",
                                    "id": {
                                        "type": "Identifier",
                                        "name": "test",
                                        "range": [
                                            9,
                                            13
                                        ]
                                    },
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ReturnStatement",
                                                "argument": {
                                                    "type": "Literal",
                                                    "value": "foo",
                                                    "raw": "'foo'",
                                                    "range": [
                                                        30,
                                                        35
                                                    ]
                                                },
                                                "range": [
                                                    23,
                                                    36
                                                ]
                                            }
                                        ],
                                        "range": [
                                            17,
                                            38
                                        ]
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false,
                                    "range": [
                                        0,
                                        38
                                    ]
                                }
                            ],
                            "sourceType": "module",
                            "range": [
                                0,
                                38
                            ],
                            "comments": []
                        });
                        
                        eval(\`\${code} test();\`);
                    `)
                } catch (e) {
                    throw new Error(`Evaluation error: ${e.message}. Code: ${obfuscatedCode}`);
                }

                assert.equal(evaluationResult, 'foo');
            });
        });

        describe(`Sha256. ${detailedDescription}`, () => {
            it('should obfuscate code without any runtime errors after obfuscation: Variant #2 sha256', () => {
                const code: string = readFileAsString(__dirname + '/fixtures/sha256.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...baseOptions,
                        ...options
                    }
                ).getObfuscatedCode();

                assert.equal(
                    eval(`
                        ${getEnvironmentCode()}
                        ${obfuscatedCode}
                        sha256('test');
                    `),
                    '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
                );
            });
        });

        /** For some reason it does not work correctly on node 10 **/
        if (NODE_MAJOR_VERSION >= 12) {
            describe(`Obfuscator. ${detailedDescription}`, () => {
                const evaluationTimeout: number = 10000;

                let evaluationResult: string;

                beforeEach((done) => {
                    const code: string = readFileAsString(process.cwd() + '/dist/index.js');

                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...baseOptions,
                            ...options
                        }
                    ).getObfuscatedCode();

                    evaluateInWorker(
                        `
                        ${getEnvironmentCode()}
                        ${obfuscatedCode}
                        module.exports.obfuscate('var foo = 1;').getObfuscatedCode();
                    `,
                        (response: string) => {
                            evaluationResult = response;
                            done();
                        },
                        (error: Error) => {
                            evaluationResult = error.message;
                            done();
                        },
                        () => {
                            done();
                        },
                        evaluationTimeout
                    );
                });

                it('should obfuscate code without any runtime errors after obfuscation: Variant #3 obfuscator', () => {
                    assert.equal(
                        evaluationResult,
                        'var foo=0x1;'
                    );
                });
            });
        }

        [
            {
                debugProtection: false,
                selfDefending: false,
                stringArray: true
            },
            {
                debugProtection: false,
                selfDefending: true,
                stringArray: false
            },
            {
                debugProtection: true,
                selfDefending: false,
                stringArray: false
            },
            {
                debugProtection: true,
                selfDefending: true,
                stringArray: false
            },
            {
                debugProtection: true,
                selfDefending: true,
                stringArray: true
            }
        ].forEach((webpackBootstrapOptions: Partial<TInputOptions>) => {
            describe(`Webpack bootstrap code. ${detailedDescription}. ${JSON.stringify(webpackBootstrapOptions)}`, () => {
                let evaluationResult: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/webpack-bootstrap.js');

                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...baseOptions,
                            ...options,
                            ...webpackBootstrapOptions
                        }
                    ).getObfuscatedCode();

                    evaluationResult = eval(`
                        ${getEnvironmentCode()}
                        ${obfuscatedCode}
                    `);
                });

                it('should obfuscate code without any runtime errors after obfuscation: Variant #4 webpack bootstrap', () => {
                    assert.equal(evaluationResult, 'foo');
                });
            });
        });
    });
});