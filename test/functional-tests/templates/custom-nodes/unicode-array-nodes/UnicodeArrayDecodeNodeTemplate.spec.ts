import 'format-unicorn';

import { AtobTemplate } from "../../../../../src/templates/custom-nodes/AtobTemplate";
import { UnicodeArrayDecodeNodeTemplate } from "../../../../../src/templates/custom-nodes/unicode-array-nodes/unicode-array-decode-node/UnicodeArrayDecodeNodeTemplate";

import { Utils } from "../../../../../src/Utils";

const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param templateData
 * @param unicodeArrayName
 * @returns {Function}
 */
function getFunctionFromTemplate (templateData: any, unicodeArrayName: string) {
    let domainLockTemplate: string = UnicodeArrayDecodeNodeTemplate().formatUnicorn(templateData);

    return Function(`
        var ${unicodeArrayName} = ['${Utils.btoa('test1')}', '${Utils.btoa('test2')}'];
    
        ${domainLockTemplate}
        
        return ${unicodeArrayName};
    `)();
}

describe('UnicodeArrayDecodeNodeTemplate (): string', () => {
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
