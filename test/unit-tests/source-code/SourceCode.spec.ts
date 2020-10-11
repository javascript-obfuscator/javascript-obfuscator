import 'reflect-metadata';

import { assert } from 'chai';

import { SourceCode } from '../../../src/source-code/SourceCode';

describe('SourceCode', () => {
    describe('getSourceCode', () => {
        describe('should return source code', () => {
            const expectedSourceCode: string = 'var test = 1;';

            let sourceCode: string;

            before(() => {
                sourceCode = new SourceCode(expectedSourceCode, 'test').getSourceCode();
            });

            it('should return source code', () => {
                assert.equal(sourceCode, expectedSourceCode);
            });
        });
    });

    describe('getSourceMap', () => {
        describe('should return source map', () => {
            const expectedSourceMap: string = 'test';

            let sourceMap: string;

            before(() => {
                sourceMap = new SourceCode('var test = 1;', expectedSourceMap).getSourceMap();
            });

            it('should return source map', () => {
                assert.equal(sourceMap, expectedSourceMap);
            });
        });
    });
});
