import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('NumberLiteralTransformer', () => {
    describe('transformation of literal node with number value', () => {
        const regExp: RegExp = /^var test *= *0x0;$/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/number-value.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should transform literal node', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('transformation of literal node with bigint value', () => {
        const regExp: RegExp = /^var test *= *0xan;$/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/bigint-value.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should transform literal node', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('numbersToHexadecimal option', () => {
        describe('when numbersToHexadecimal is true (default)', () => {
            const regExp: RegExp = /^setInterval\(sendHeartbeat, 0x3e8 \* 0x3c \* 0x1\);$/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = 'setInterval(sendHeartbeat, 1000 * 60 * 1);';

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        numbersToHexadecimal: true,
                        compact: false
                    }
                ).getObfuscatedCode();
            });

            it('should convert numbers to hexadecimal', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('when numbersToHexadecimal is false', () => {
            const regExp: RegExp = /^setInterval\(sendHeartbeat, 1000 \* 60 \* 1\);$/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = 'setInterval(sendHeartbeat, 1000 * 60 * 1);';

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        numbersToHexadecimal: false,
                        compact: false
                    }
                ).getObfuscatedCode();
            });

            it('should keep numbers in decimal format', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });
});
