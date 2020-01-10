import { assert } from 'chai';

import { TInputOptions } from '../../src/types/options/TInputOptions';

import { StringArrayEncoding } from '../../src/enums/StringArrayEncoding';

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
        disableConsoleOutput: true,
        rotateStringArray: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayEncoding: StringArrayEncoding.Rc4,
        stringArrayThreshold: 1,
        transformObjectKeys: true,
        unicodeEscapeSequence: true
    };

    this.timeout(100000);

    describe('Astring', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/astring.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                options
            ).getObfuscatedCode();
        });

        it('should obfuscate code without any runtime errors after obfuscation: Variant #1 astring', () => {
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

    describe('Sha256', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/sha256.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                options
            ).getObfuscatedCode();
        });

        it('should obfuscate code without any runtime errors after obfuscation: Variant #2 sha256', () => {
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