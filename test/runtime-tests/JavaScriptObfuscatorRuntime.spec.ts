import { assert } from 'chai';

import { TInputOptions } from '../../src/types/options/TInputOptions';

import { StringArrayEncoding } from '../../src/enums/StringArrayEncoding';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscatorFacade';

const getEnvironmentCode = () => `
    global.document = {
        domain: 'obfuscator.io'
    };
`;

describe('JavaScriptObfuscator runtime eval', function () {
    const options: TInputOptions = {
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        disableConsoleOutput: true,
        domainLock: ['obfuscator.io'],
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

    this.timeout(100000);

    [
        IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
        IdentifierNamesGenerator.MangledIdentifierNamesGenerator
    ].forEach((identifierNamesGenerator) => {
        describe(`Astring. Identifier names generator: ${identifierNamesGenerator}`, () => {
            it('should obfuscate code without any runtime errors after obfuscation: Variant #1 astring', () => {
                const code: string = readFileAsString(__dirname + '/fixtures/astring.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...options,
                        identifierNamesGenerator
                    }
                ).getObfuscatedCode();

                assert.equal(
                    eval(`
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
             `),
                    'foo'
                );
            });
        });

        describe(`Sha256. Identifier names generator: ${identifierNamesGenerator}`, () => {
            it('should obfuscate code without any runtime errors after obfuscation: Variant #2 sha256', () => {
                const code: string = readFileAsString(__dirname + '/fixtures/sha256.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...options,
                        identifierNamesGenerator
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
    });
});