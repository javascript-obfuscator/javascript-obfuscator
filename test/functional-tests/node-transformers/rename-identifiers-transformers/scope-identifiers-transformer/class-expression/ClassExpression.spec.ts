import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('ScopeIdentifiersTransformer ClassExpression identifiers', () => {
    describe('transformation of ClassExpression identifiers', () => {
        describe('Variant #1: `ClassExpression` parent block scope is not a `ProgramNode`', () => {
            const classNameIdentifierRegExp: RegExp = /var (_0x[a-f0-9]{4,6}) *= *class *\{/;
            const classCallIdentifierRegExp: RegExp = /new *(_0x[a-f0-9]{4,6}) *\( *\);/;

            let obfuscatedCode: string,
                classNameIdentifier: string,
                classCallIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/base.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
                classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                classCallIdentifier = getRegExpMatch(obfuscatedCode, classCallIdentifierRegExp);
            });

            it('should transform class variable name', () => {
                assert.equal(classNameIdentifier, classCallIdentifier);
            });
        });

        describe('Variant #2: `ClassExpression` parent block scope is a `ProgramNode`', () => {
            const classNameIdentifierRegExp: RegExp = /var Foo *= *class *\{/;
            const classCallIdentifierRegExp: RegExp = /new *Foo *\( *\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('match #1: shouldn\'t transform class name', () => {
                assert.match(obfuscatedCode, classNameIdentifierRegExp);
            });

            it('match #2: shouldn\'t transform class name', () => {
                assert.match(obfuscatedCode, classCallIdentifierRegExp);
            });
        });
    });
});
