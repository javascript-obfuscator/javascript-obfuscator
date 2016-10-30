import 'format-unicorn';

import { AtobTemplate } from '../../../../../src/templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../../../../src/templates/custom-nodes/Rc4Template';
import { UnicodeArrayBase64DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayBase64DecodeNodeTemplate';
import { UnicodeArrayCallsWrapperTemplate } from '../../../../../src/templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayCallsWrapperTemplate';
import { UnicodeArrayRc4DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayRC4DecodeNodeTemplate';

import { Utils } from '../../../../../src/Utils';

const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param templateData
 * @param unicodeArrayName
 * @param unicodeArrayCallsWrapperName
 * @param index
 * @returns {Function}
 */
function getFunctionFromTemplateBase64Encoding (
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

/**
 * @param templateData
 * @param unicodeArrayName
 * @param unicodeArrayCallsWrapperName
 * @param index
 * @param key
 * @returns {Function}
 */
function getFunctionFromTemplateRc4Encoding (
    templateData: any,
    unicodeArrayName: string,
    unicodeArrayCallsWrapperName: string,
    index: string,
    key: string
) {
    let unicodeArrayCallsWrapperTemplate: string = UnicodeArrayCallsWrapperTemplate().formatUnicorn(templateData);

    return Function(`
        var ${unicodeArrayName} = ['${Utils.btoa(Utils.rc4('test1', key))}'];
    
        ${unicodeArrayCallsWrapperTemplate}
        
        return ${unicodeArrayCallsWrapperName}('${index}', '${key}');
    `)();
}

describe('UnicodeArrayCallsWrapperNodeTemplate (): string', () => {
    let unicodeArrayName: string = 'unicodeArrayName',
        unicodeArrayCallsWrapperName: string = 'unicodeArrayCallsWrapperName',
        atobDecodeNodeTemplate: string = UnicodeArrayBase64DecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            selfDefendingCode: '',
            unicodeArrayCallsWrapperName
        }),
        rc4DecodeNodeTemplate: string = UnicodeArrayRc4DecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            rc4Polyfill: Rc4Template(),
            selfDefendingCode: '',
            unicodeArrayCallsWrapperName
        });

    it('should correctly returns decoded value with base64 encoding', () => {
        assert.deepEqual(getFunctionFromTemplateBase64Encoding({
            decodeNodeTemplate: atobDecodeNodeTemplate,
            unicodeArrayCallsWrapperName,
            unicodeArrayName
        }, unicodeArrayName, unicodeArrayCallsWrapperName, '0x0'), 'test1');
    });

    it('should correctly returns decoded value with rc4 encoding', () => {
        assert.deepEqual(getFunctionFromTemplateRc4Encoding({
            decodeNodeTemplate: rc4DecodeNodeTemplate,
            unicodeArrayCallsWrapperName,
            unicodeArrayName
        }, unicodeArrayName, unicodeArrayCallsWrapperName, '0x0', 'key'), 'test1');
    });
});
