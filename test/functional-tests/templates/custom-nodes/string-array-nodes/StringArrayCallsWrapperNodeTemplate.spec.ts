import * as format from 'string-template';

import { assert } from 'chai';

import { AtobTemplate } from '../../../../../src/templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../../../../src/templates/custom-nodes/Rc4Template';
import { StringArrayBase64DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRc4DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate';

import { CryptUtils } from '../../../../../src/utils/CryptUtils';

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
    const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), templateData);

    return Function(`
        var ${stringArrayName} = ['${CryptUtils.btoa('test1')}'];
    
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
    const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), templateData);

    return Function(`
        var ${stringArrayName} = ['${CryptUtils.btoa(CryptUtils.rc4('test1', key))}'];
    
        ${stringArrayCallsWrapperTemplate}
        
        return ${stringArrayCallsWrapperName}('${index}', '${key}');
    `)();
}

describe('StringArrayCallsWrapperNodeTemplate (): string', () => {
    const stringArrayName: string = 'stringArrayName';
    const stringArrayCallsWrapperName: string = 'stringArrayCallsWrapperName';

    describe('variant #1: `base64` encoding', () => {
        const atobDecodeNodeTemplate: string = format(StringArrayBase64DecodeNodeTemplate(), {
            atobPolyfill: AtobTemplate(),
            selfDefendingCode: '',
            stringArrayCallsWrapperName
        });
        const index: string = '0x0';
        const expectedDecodedValue: string = 'test1';

        let decodedValue: string;

        before(() => {
            decodedValue = getFunctionFromTemplateBase64Encoding({
                decodeNodeTemplate: atobDecodeNodeTemplate,
                stringArrayCallsWrapperName,
                stringArrayName
            }, stringArrayName, stringArrayCallsWrapperName, index);
        });

        it('should correctly return decoded value', () => {
            assert.deepEqual(decodedValue, expectedDecodedValue);
        });
    });

    describe('variant #2: `rc4` encoding', () => {
        const rc4DecodeNodeTemplate: string = format(StringArrayRc4DecodeNodeTemplate(), {
            atobPolyfill: AtobTemplate(),
            rc4Polyfill: Rc4Template(),
            selfDefendingCode: '',
            stringArrayCallsWrapperName
        });
        const index: string = '0x0';
        const key: string = 'key';
        const expectedDecodedValue: string = 'test1';

        let decodedValue: string;

        before(() => {
            decodedValue = getFunctionFromTemplateRc4Encoding({
                decodeNodeTemplate: rc4DecodeNodeTemplate,
                stringArrayCallsWrapperName,
                stringArrayName
            }, stringArrayName, stringArrayCallsWrapperName, index, key);
        });

        it('should correctly return decoded value', () => {
            assert.deepEqual(decodedValue, expectedDecodedValue);
        });
    });
});
