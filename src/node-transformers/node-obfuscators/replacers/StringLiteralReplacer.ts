import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';
import { ICustomNodeWithData } from '../../../interfaces/custom-nodes/ICustomNodeWithData';
import { ICustomNodeWithIdentifier } from '../../../interfaces/custom-nodes/ICustomNodeWithIdentifier';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { StringArrayEncoding } from '../../../enums/StringArrayEncoding';

import { AbstractReplacer } from './AbstractReplacer';
import { CryptUtils } from '../../../utils/CryptUtils';
import { CustomNodes } from '../../../enums/container/CustomNodes';
import { CustomNodeGroups } from '../../../enums/container/CustomNodeGroups';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';
import { Utils } from '../../../utils/Utils';

@injectable()
export class StringLiteralReplacer extends AbstractReplacer {
    /**
     * @type {number}
     */
    private static readonly minimumLengthForStringArray: number = 3;

    /**
     * @type {string[]}
     */
    private static readonly rc4Keys: string[] = RandomGeneratorUtils.getRandomGenerator()
        .n(() => RandomGeneratorUtils.getRandomGenerator().string({length: 4}), 50);

    /**
     * @type {IStorage<ICustomNodeGroup>}
     */
    private readonly customNodeGroupStorage: IStorage<ICustomNodeGroup>;

    /**
     * @param customNodeGroupStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['IStorage<ICustomNodeGroup>']) customNodeGroupStorage: IStorage<ICustomNodeGroup>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeGroupStorage = customNodeGroupStorage;
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: string): string {
        const replaceWithStringArrayFlag: boolean = (
            nodeValue.length >= StringLiteralReplacer.minimumLengthForStringArray
            && RandomGeneratorUtils.getRandomFloat(0, 1) <= this.options.stringArrayThreshold
        );

        if (this.options.stringArray && replaceWithStringArrayFlag) {
            return this.replaceStringLiteralWithStringArrayCall(nodeValue);
        }

        return `'${Utils.stringToUnicodeEscapeSequence(nodeValue)}'`;
    }

    /**
     * @param value
     * @returns {string}
     */
    private replaceStringLiteralWithStringArrayCall (value: string): string {
        const stringArrayCustomNodeGroupNodes: Map <CustomNodes, ICustomNode> = this.customNodeGroupStorage
            .get(CustomNodeGroups.StringArrayCustomNodeGroup)
            .getCustomNodes();
        const stringArrayNode: ICustomNodeWithData = <ICustomNodeWithData>stringArrayCustomNodeGroupNodes
            .get(CustomNodes.StringArrayNode);

        let rc4Key: string = '';

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.base64:
                value = CryptUtils.btoa(value);

                break;

            case StringArrayEncoding.rc4:
                rc4Key = RandomGeneratorUtils.getRandomGenerator().pickone(StringLiteralReplacer.rc4Keys);
                value = CryptUtils.btoa(CryptUtils.rc4(value, rc4Key));

                break;
        }

        if (this.options.unicodeEscapeSequence) {
            value = Utils.stringToUnicodeEscapeSequence(value);
        }

        const stringArray: IStorage <string> = stringArrayNode.getNodeData();
        const indexOfExistingValue: number = <number>stringArray.getKeyOf(value);

        let indexOfValue: number;

        if (indexOfExistingValue >= 0) {
            indexOfValue = indexOfExistingValue;
        } else {
            indexOfValue = stringArray.getLength();
            stringArray.set(null, value);
        }

        const stringArrayCallsWrapper: ICustomNodeWithIdentifier = <ICustomNodeWithIdentifier>stringArrayCustomNodeGroupNodes
            .get(CustomNodes.StringArrayCallsWrapper);
        const hexadecimalIndex: string = `${Utils.hexadecimalPrefix}${Utils.decToHex(indexOfValue)}`;

        if (this.options.stringArrayEncoding === StringArrayEncoding.rc4) {
            return `${stringArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}', '${Utils.stringToUnicodeEscapeSequence(rc4Key)}')`;
        }

        return `${stringArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}')`;
    }
}
