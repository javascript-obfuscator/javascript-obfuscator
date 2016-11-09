import 'format-unicorn';

import { AtobTemplate } from '../../../../../src/templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../../../../src/templates/custom-nodes/Rc4Template';
import { StringArrayBase64DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRc4DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate';

import { Utils } from '../../../../../src/Utils';

const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param templateData
 * @param stringArrayName
 * @param stringArrayCallsWrapperName
 * @param index
 * @returns {Function}
 */
function getFunctionFromTemplateBase64Encoding (
    templateData: any,
    stringArrayName: string,
    stringArrayCallsWrapperName: string,
    index: string
) {
    let stringArrayCallsWrapperTemplate: string = StringArrayCallsWrapperTemplate().formatUnicorn(templateData);

    return Function(`
        var ${stringArrayName} = ['${Utils.btoa('test1')}'];
    
        ${stringArrayCallsWrapperTemplate}
        
        return ${stringArrayCallsWrapperName}(${index});
    `)();
}

/**
 * @param templateData
 * @param stringArrayName
 * @param stringArrayCallsWrapperName
 * @param index
 * @param key
 * @returns {Function}
 */
function getFunctionFromTemplateRc4Encoding (
    templateData: any,
    stringArrayName: string,
    stringArrayCallsWrapperName: string,
    index: string,
    key: string
) {
    let stringArrayCallsWrapperTemplate: string = StringArrayCallsWrapperTemplate().formatUnicorn(templateData);

    return Function(`
        var ${stringArrayName} = ['${Utils.btoa(Utils.rc4('test1', key))}'];
    
        ${stringArrayCallsWrapperTemplate}
        
        return ${stringArrayCallsWrapperName}('${index}', '${key}');
    `)();
}

describe('StringArrayCallsWrapperNodeTemplate (): string', () => {
    let stringArrayName: string = 'stringArrayName',
        stringArrayCallsWrapperName: string = 'stringArrayCallsWrapperName',
        atobDecodeNodeTemplate: string = StringArrayBase64DecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            selfDefendingCode: '',
            stringArrayCallsWrapperName
        }),
        rc4DecodeNodeTemplate: string = StringArrayRc4DecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            rc4Polyfill: Rc4Template(),
            selfDefendingCode: '',
            stringArrayCallsWrapperName
        });

    it('should correctly returns decoded value with base64 encoding', () => {
        assert.deepEqual(getFunctionFromTemplateBase64Encoding({
            decodeNodeTemplate: atobDecodeNodeTemplate,
            stringArrayCallsWrapperName,
            stringArrayName
        }, stringArrayName, stringArrayCallsWrapperName, '0x0'), 'test1');
    });

    it('should correctly returns decoded value with rc4 encoding', () => {
        assert.deepEqual(getFunctionFromTemplateRc4Encoding({
            decodeNodeTemplate: rc4DecodeNodeTemplate,
            stringArrayCallsWrapperName,
            stringArrayName
        }, stringArrayName, stringArrayCallsWrapperName, '0x0', 'key'), 'test1');
    });
});
