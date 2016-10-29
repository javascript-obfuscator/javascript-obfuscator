import 'format-unicorn';

import { AtobTemplate } from '../../../../../src/templates/custom-nodes/AtobTemplate';
import { UnicodeArrayAtobDecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayAtobDecodeNodeTemplate';

import { Utils } from '../../../../../src/Utils';

const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param templateData
 * @param unicodeArrayName
 * @returns {Function}
 */
function getFunctionFromTemplate (templateData: any, unicodeArrayName: string) {
    let domainLockTemplate: string = UnicodeArrayAtobDecodeNodeTemplate().formatUnicorn(templateData);

    return Function(`
        var ${unicodeArrayName} = ['${Utils.btoa('test1')}', '${Utils.btoa('test2')}'];
    
        ${domainLockTemplate}
        
        return ${unicodeArrayName};
    `)();
}

describe('UnicodeArrayAtobDecodeNodeTemplate (): string', () => {
    let forLoopFunctionName: string = 'forLoop',
        code: string = `${forLoopFunctionName}();`,
        unicodeArrayName: string = 'unicodeArray';

    it('should correctly decode unicode array items from Base64', () => {
        assert.deepEqual(getFunctionFromTemplate({
            atobPolyfill: AtobTemplate(),
            code,
            forLoopFunctionName,
            unicodeArrayName: unicodeArrayName
        }, unicodeArrayName), ['test1', 'test2']);
    });

});
