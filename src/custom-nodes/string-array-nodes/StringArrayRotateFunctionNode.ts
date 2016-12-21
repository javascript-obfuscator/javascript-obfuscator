import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { initializable } from '../../decorators/Initializable';

import { NO_CUSTOM_NODES_PRESET } from '../../options/presets/NoCustomNodes';

import { SelfDefendingTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate';
import { StringArrayRotateFunctionTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeUtils } from '../../node/NodeUtils';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';
import { Utils } from '../../utils/Utils';

@injectable()
export class StringArrayRotateFunctionNode extends AbstractCustomNode {
    /**
     * @type {IStorage <string>}
     */
    @initializable()
    private stringArrayStorage: IStorage <string>;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayName: string;

    /**
     * @param {number}
     */
    @initializable()
    private stringArrayRotateValue: number;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param stringArrayStorage
     * @param stringArrayName
     * @param stringArrayRotateValue
     */
    public initialize (
        stringArrayStorage: IStorage <string>,
        stringArrayName: string,
        stringArrayRotateValue: number
    ): void {
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;
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
        const timesName: string = RandomGeneratorUtils.getRandomVariableName();
        const whileFunctionName: string = RandomGeneratorUtils.getRandomVariableName();

        let code: string = '';

        if (this.options.selfDefending) {
            code = format(SelfDefendingTemplate(), {
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
                stringArrayRotateValue: Utils.decToHex(this.stringArrayRotateValue),
                whileFunctionName
            }),
            {
                ...NO_CUSTOM_NODES_PRESET,
                seed: this.options.seed
            }
        ).getObfuscatedCode();
    }
}
