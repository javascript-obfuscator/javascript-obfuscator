import * as format from 'string-template';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../../src/container/ServiceIdentifiers';

import { ICryptUtils } from '../../../../../src/interfaces/utils/ICryptUtils';
import { IInversifyContainerFacade } from '../../../../../src/interfaces/container/IInversifyContainerFacade';

import { AtobTemplate } from '../../../../../src/templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../../../../src/templates/custom-nodes/Rc4Template';
import { StringArrayBase64DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRc4DecodeNodeTemplate } from '../../../../../src/templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate';

import { InversifyContainerFacade } from '../../../../../src/container/InversifyContainerFacade';

describe('StringArrayCallsWrapperNodeTemplate (): string', () => {
    const stringArrayName: string = 'stringArrayName';
    const stringArrayCallsWrapperName: string = 'stringArrayCallsWrapperName';

    let cryptUtils: ICryptUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', {});
        cryptUtils = inversifyContainerFacade.get<ICryptUtils>(ServiceIdentifiers.ICryptUtils);
    });

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
            const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                decodeNodeTemplate: atobDecodeNodeTemplate,
                stringArrayCallsWrapperName,
                stringArrayName
            });

            decodedValue = Function(`
                var ${stringArrayName} = ['${cryptUtils.btoa('test1')}'];
            
                ${stringArrayCallsWrapperTemplate}
                
                return ${stringArrayCallsWrapperName}(${index});
            `)();
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
            const stringArrayCallsWrapperTemplate: string = format(StringArrayCallsWrapperTemplate(), {
                decodeNodeTemplate: rc4DecodeNodeTemplate,
                stringArrayCallsWrapperName,
                stringArrayName
            });

            decodedValue = Function(`
                var ${stringArrayName} = ['${cryptUtils.btoa(cryptUtils.rc4('test1', key))}'];
            
                ${stringArrayCallsWrapperTemplate}
                
                return ${stringArrayCallsWrapperName}('${index}', '${key}');
            `)();
        });

        it('should correctly return decoded value', () => {
            assert.deepEqual(decodedValue, expectedDecodedValue);
        });
    });
});
