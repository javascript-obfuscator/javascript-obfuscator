import 'format-unicorn';

import { AtobTemplate } from '../../../../../src/templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../../../../src/templates/custom-nodes/Rc4Template';
import { StringsArrayBase64DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/strings-array-nodes/strings-array-calls-wrapper/StringsArrayBase64DecodeNodeTemplate';
import { StringsArrayCallsWrapperTemplate } from '../../../../../src/templates/custom-nodes/strings-array-nodes/strings-array-calls-wrapper/StringsArrayCallsWrapperTemplate';
import { StringsArrayRc4DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/strings-array-nodes/strings-array-calls-wrapper/StringsArrayRC4DecodeNodeTemplate';

import { Utils } from '../../../../../src/Utils';

const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param templateData
 * @param stringsArrayName
 * @param stringsArrayCallsWrapperName
 * @param index
 * @returns {Function}
 */
function getFunctionFromTemplateBase64Encoding (
    templateData: any,
    stringsArrayName: string,
    stringsArrayCallsWrapperName: string,
    index: string
) {
    let stringsArrayCallsWrapperTemplate: string = StringsArrayCallsWrapperTemplate().formatUnicorn(templateData);

    return Function(`
        var ${stringsArrayName} = ['${Utils.btoa('test1')}'];
    
        ${stringsArrayCallsWrapperTemplate}
        
        return ${stringsArrayCallsWrapperName}(${index});
    `)();
}

/**
 * @param templateData
 * @param stringsArrayName
 * @param stringsArrayCallsWrapperName
 * @param index
 * @param key
 * @returns {Function}
 */
function getFunctionFromTemplateRc4Encoding (
    templateData: any,
    stringsArrayName: string,
    stringsArrayCallsWrapperName: string,
    index: string,
    key: string
) {
    let stringsArrayCallsWrapperTemplate: string = StringsArrayCallsWrapperTemplate().formatUnicorn(templateData);

    return Function(`
        var ${stringsArrayName} = ['${Utils.btoa(Utils.rc4('test1', key))}'];
    
        ${stringsArrayCallsWrapperTemplate}
        
        return ${stringsArrayCallsWrapperName}('${index}', '${key}');
    `)();
}

describe('StringsArrayCallsWrapperNodeTemplate (): string', () => {
    let stringsArrayName: string = 'stringsArrayName',
        stringsArrayCallsWrapperName: string = 'stringsArrayCallsWrapperName',
        atobDecodeNodeTemplate: string = StringsArrayBase64DecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            selfDefendingCode: '',
            stringsArrayCallsWrapperName
        }),
        rc4DecodeNodeTemplate: string = StringsArrayRc4DecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            rc4Polyfill: Rc4Template(),
            selfDefendingCode: '',
            stringsArrayCallsWrapperName
        });

    it('should correctly returns decoded value with base64 encoding', () => {
        assert.deepEqual(getFunctionFromTemplateBase64Encoding({
            decodeNodeTemplate: atobDecodeNodeTemplate,
            stringsArrayCallsWrapperName,
            stringsArrayName
        }, stringsArrayName, stringsArrayCallsWrapperName, '0x0'), 'test1');
    });

    it('should correctly returns decoded value with rc4 encoding', () => {
        assert.deepEqual(getFunctionFromTemplateRc4Encoding({
            decodeNodeTemplate: rc4DecodeNodeTemplate,
            stringsArrayCallsWrapperName,
            stringsArrayName
        }, stringsArrayName, stringsArrayCallsWrapperName, '0x0', 'key'), 'test1');
    });
});
