import { assert } from 'chai';

import { TInputOptions } from '../../src/types/options/TInputOptions';

import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { RenamePropertiesMode } from '../../src/enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';
import { StringArrayEncoding } from '../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayIndexesType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';
import { StringArrayWrappersType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { evaluateInWorker } from '../helpers/evaluateInWorker';
import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscatorFacade';

const getEnvironmentCode = () => `
    global.document = {
        domain: 'obfuscator.io'
    };
`;

describe('JavaScriptObfuscator runtime eval', function () {
    const baseOptions: TInputOptions = {
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        disableConsoleOutput: true,
        domainLock: ['obfuscator.io'],
        log: true,
        numbersToExpressions: true,
        simplify: true,
        renameProperties: true,
        renamePropertiesMode: RenamePropertiesMode.Unsafe,
        stringArrayRotate: true,
        selfDefending: true,
        splitStrings: true,
        splitStringsChunkLength: 3,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 1,
        stringArrayEncoding: [
            StringArrayEncoding.None,
            StringArrayEncoding.Base64,
            StringArrayEncoding.Rc4
        ],
        stringArrayIndexesType: [
            StringArrayIndexesType.HexadecimalNumber,
            StringArrayIndexesType.HexadecimalNumericString
        ],
        stringArrayIndexShift: true,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersCount: 5,
        stringArrayWrappersParametersMaxCount: 5,
        stringArrayWrappersType: StringArrayWrappersType.Function,
        stringArrayThreshold: 1,
        transformObjectKeys: true,
        unicodeEscapeSequence: true
    };

    this.timeout(600000);

    const options: Partial<TInputOptions>[] = [
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
        },
        {
            identifierNamesGenerator: IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator,
            renameGlobals: false
        },
        {
            identifierNamesGenerator: IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator,
            renameGlobals: true
        }
    ];

    options.forEach((options: Partial<TInputOptions>) => {
        const detailedDescription: string = `Identifier names generator: ${options.identifierNamesGenerator}, rename globals: ${options.renameGlobals?.toString()}`;

        describe(`Astring. ${detailedDescription}`, () => {
            it('should obfuscate code without any runtime errors after obfuscation: Variant #1 astring', () => {
                const code: string = readFileAsString(__dirname + '/fixtures/astring.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    `
                    ${getEnvironmentCode()}
                    ${code}
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
                    `,
                    {
                        ...baseOptions,
                        ...options,
                        renamePropertiesMode: RenamePropertiesMode.Safe,
                        reservedNames: ['generate']
                    }
                ).getObfuscatedCode();

                let evaluationResult: string;

                try {
                    evaluationResult = eval(obfuscatedCode)
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
                    `
                    ${getEnvironmentCode()}
                    ${code}
                    sha256('test');
                    `,
                    {
                        ...baseOptions,
                        ...options,
                        reservedNames: ['sha256']
                    }
                ).getObfuscatedCode();

                assert.equal(
                    eval(obfuscatedCode),
                    '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
                );
            });
        });

        describe(`Obfuscator. ${detailedDescription}`, () => {
            const evaluationTimeout: number = 50000;

            let evaluationResult: string;

            beforeEach(() => {
                const code: string = readFileAsString(process.cwd() + '/dist/index.js');

                const obfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...baseOptions,
                        ...options,
                        renameProperties: false
                    }
                );
                const obfuscatorOptions = obfuscationResult.getOptions();
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

                return evaluateInWorker(
                    `
                        ${getEnvironmentCode()}
                        ${obfuscatedCode}
                        module.exports.obfuscate('var foo = 1;').getObfuscatedCode();
                    `,
                    evaluationTimeout
                )
                    .then((result: string | null) => {
                        if (!result) {
                            return;
                        }

                        evaluationResult = result;
                    })
                    .catch((error: Error) => {
                        evaluationResult = `${error.message}. ${error.stack}. Options: ${JSON.stringify(obfuscatorOptions)} Code: ${obfuscationResult}`;
                    });
            });

            it('should obfuscate code without any runtime errors after obfuscation: Variant #3 obfuscator', () => {
                assert.equal(
                    evaluationResult,
                    'var foo=0x1;'
                );
            });
        });

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
                            ...webpackBootstrapOptions,
                            reservedNames: ['^foo$']
                        }
                    ).getObfuscatedCode();

                    try {
                        evaluationResult = eval(`
                            ${getEnvironmentCode()}
                            ${obfuscatedCode}
                        `);
                    } catch (e) {
                        throw new Error(`Evaluation error: ${e.message}. Code: ${obfuscatedCode}`);
                    }
                });

                it('should obfuscate code without any runtime errors after obfuscation: Variant #4 webpack bootstrap', () => {
                    assert.equal(evaluationResult, 'foo');
                });
            });
        });
    });
});
