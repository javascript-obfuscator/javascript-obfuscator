import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import format from 'string-template';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayStorage } from '../../types/storages/TStringArrayStorage';

import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { NO_ADDITIONAL_NODES_PRESET } from '../../options/presets/NoCustomNodes';

import { SelfDefendingTemplate } from '../../templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate';
import { StringArrayRotateFunctionTemplate } from '../../templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscatorFacade';
import { NodeUtils } from '../../node/NodeUtils';
import { NumberUtils } from '../../utils/NumberUtils';

@injectable()
export class StringArrayRotateFunctionNode extends AbstractCustomNode {
    /**
     * @type {TStringArrayStorage}
     */
    @initializable()
    private stringArrayStorage!: TStringArrayStorage;

    /**
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayName!: string;

    /**
     * @type {string}
     */
    @initializable()
    private stringHashName!: string;

    /**
     * @param {number}
     */
    @initializable()
    private stringArrayRotateValue!: number;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);

        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }

    /**
     * @param {string} stringArrayName
     * @param {number} stringArrayRotateValue
     */
    public initialize (
        stringArrayStorage: TStringArrayStorage,
        stringArrayName: string,
        stringArrayRotateValue: number,
        stringHashName: string
    ): void {
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;
        this.stringHashName = stringHashName;
    }

    /**
     * @param {number} number
     * @param {number} length
     * 
     * note: This might also belong in the string utils class.
     */
    protected generateNumberShortener (number: number, length: number): number[] {
        const randoms: number[] = [];
        while (Math.abs(number).toString().length > length) {
            const random: number = Math.floor(Math.random() * Math.pow(10, Math.abs(number).toString().length - 1));
            number = number % random;
            randoms.push(random);
        }

        return randoms;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(this.getTemplate());
    }

    /**
     * @returns {string}
     */
    protected getTemplate (): string {
        const timesName: string = this.identifierNamesGenerator.generate();
        const whileFunctionName: string = this.identifierNamesGenerator.generate();

        let code: string = '';

        let rotateValue: string = `0x${NumberUtils.toHex(this.stringArrayRotateValue)}`;
        if (this.options.selfDefending) {
            let hash: number = this.stringArrayStorage.hash();
            const shortener: number[] = this.generateNumberShortener(hash, 5);
            rotateValue = this.stringHashName;
            for (const value of shortener) {
                rotateValue += `%0x${NumberUtils.toHex(value)}`;
                hash = hash % value;
            }
            const diff: number = this.stringArrayRotateValue - hash;
            rotateValue += `${(Math.sign(diff) === -1 ? "-" : "+")}0x${NumberUtils.toHex(Math.abs(diff))}`;
            
            code = format(SelfDefendingTemplate(this.escapeSequenceEncoder), {
                timesName,
                whileFunctionName
            });

        } else {
            code = `${whileFunctionName}(++${timesName})`;
        }

        return JavaScriptObfuscator.obfuscate(
            format(StringArrayRotateFunctionTemplate(), {
                code,
                timesName,
                stringArrayName: this.stringArrayName,
                stringArrayRotateValue: rotateValue,
                whileFunctionName
            }),
            {
                ...NO_ADDITIONAL_NODES_PRESET,
                identifierNamesGenerator: this.options.identifierNamesGenerator,
                seed: this.options.seed
            }
        ).getObfuscatedCode();
    }
}
