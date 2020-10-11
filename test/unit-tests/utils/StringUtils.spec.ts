import { assert } from 'chai';

import { StringUtils } from '../../../src/utils/StringUtils';

describe('StringUtils', function () {
    this.timeout(30000);

    describe('escapeJsString', () => {
        describe('Variant #1: single quotes', () => {
            const expectedEscapedJsString: string = 'const foo = \\\'Hello World!\\\'';

            let escapedJsString: string;

            before(() => {
                escapedJsString = StringUtils.escapeJsString('const foo = \'Hello World!\'');
            });

            it('should escape js string', () => {
                assert.equal(escapedJsString, expectedEscapedJsString);
            });
        });

        describe('Variant #2: double quotes', () => {
            const expectedEscapedJsString: string = 'const foo = \\"Hello World!\\"';

            let escapedJsString: string;

            before(() => {
                escapedJsString = StringUtils.escapeJsString('const foo = "Hello World!"');
            });

            it('should escape js string', () => {
                assert.equal(escapedJsString, expectedEscapedJsString);
            });
        });
    });
});
