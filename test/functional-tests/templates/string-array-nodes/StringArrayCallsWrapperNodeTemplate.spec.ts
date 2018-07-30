import 'reflect-metadata';

import format from 'string-template';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { ICryptUtils } from '../../../../src/interfaces/utils/ICryptUtils';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IRandomGenerator } from '../../../../src/interfaces/utils/IRandomGenerator';

import { AtobTemplate } from '../../../../src/templates/AtobTemplate';
import { GlobalVariableTemplate1 } from '../../../../src/templates/GlobalVariableTemplate1';
import { Rc4Template } from '../../../../src/templates/Rc4Template';
import { StringArrayBase64DecodeNodeTemplate } from '../../../../src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../../../src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRc4DecodeNodeTemplate } from '../../../../src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('StringArrayCallsWrapperNodeTemplate', () => {
    const stringArrayName: string = 'stringArrayName';
    const stringArrayCallsWrapperName: string = 'stringArrayCallsWrapperName';

    let cryptUtils: ICryptUtils,
        randomGenerator: IRandomGenerator;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtils = inversifyContainerFacade.get<ICryptUtils>(ServiceIdentifiers.ICryptUtils);
        randomGenerator = inversifyContainerFacade.get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator);
    });

    describe('Variant #1: `base64` encoding', () => {
        const index: string = '0x0';
        const expectedDecodedValue: string = 'test1';

        let decodedValue: string;

        before(() => {
            const atobPolyfill = format(AtobTemplate(), {
                globalVariableTemplate: GlobalVariableTemplate1()
            });
            const atobDecodeNodeTemplate: string = format(
                StringArrayBase64DecodeNodeTemplate(randomGenerator),
                {
                    atobPolyfill,
                    selfDefendingCode: '',
                    stringArrayCallsWrapperName
                }
            );
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

    describe('Variant #2: `rc4` encoding', () => {
        const index: string = '0x0';
        const key: string = 'key';
        const expectedDecodedValue: string = 'test1';

        let decodedValue: string;

        before(() => {
            const atobPolyfill = format(AtobTemplate(), {
                globalVariableTemplate: GlobalVariableTemplate1()
            });
            const rc4DecodeNodeTemplate: string = format(
                StringArrayRc4DecodeNodeTemplate(randomGenerator),
                {
                    atobPolyfill,
                    rc4Polyfill: Rc4Template(),
                    selfDefendingCode: '',
                    stringArrayCallsWrapperName
                }
            );
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
