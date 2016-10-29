import 'format-unicorn';

import { AtobTemplate } from '../../../../../src/templates/custom-nodes/AtobTemplate';
import { UnicodeArrayAtobDecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayAtobDecodeNodeTemplate';
import { UnicodeArrayCallsWrapperTemplate } from '../../../../../src/templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayCallsWrapperTemplate';

import { Utils } from '../../../../../src/Utils';

const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param templateData
 * @param unicodeArrayName
 * @param unicodeArrayCallsWrapperName
 * @param index
 * @returns {Function}
 */
function getFunctionFromTemplate (
    templateData: any,
    unicodeArrayName: string,
    unicodeArrayCallsWrapperName: string,
    index: string
) {
    let unicodeArrayCallsWrapperTemplate: string = UnicodeArrayCallsWrapperTemplate().formatUnicorn(templateData);

    return Function(`
        var ${unicodeArrayName} = ['${Utils.btoa('test1')}'];
    
        ${unicodeArrayCallsWrapperTemplate}
        
        return ${unicodeArrayCallsWrapperName}(${index});
    `)();
}

describe('UnicodeArrayCallsWrapperNodeTemplate (): string', () => {
    let decodeFunctionName: string = 'decodeFunction',
        unicodeArrayName: string = 'unicodeArrayName',
        unicodeArrayCallsWrapperName: string = 'unicodeArrayCallsWrapperName',
        atobDecodeNodeTemplate: string = UnicodeArrayAtobDecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            code: `value = ${decodeFunctionName}(decodedValues, index, value);`,
            decodeFunctionName,
            unicodeArrayCallsWrapperName
        });

    it('should correctly returns decoded value with atob encoding', () => {
        assert.deepEqual(getFunctionFromTemplate({
            decodeNodeTemplate: atobDecodeNodeTemplate,
            unicodeArrayCallsWrapperName,
            unicodeArrayName
        }, unicodeArrayName, unicodeArrayCallsWrapperName, '0x0'), 'test1');
    });
});
