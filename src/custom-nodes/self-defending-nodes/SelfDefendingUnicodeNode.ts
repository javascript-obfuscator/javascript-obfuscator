import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { IOptions } from '../../interfaces/options/IOptions';

import { initializable } from '../../decorators/Initializable';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { SelfDefendingTemplate } from '../../templates/custom-nodes/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

@injectable()
export class SelfDefendingUnicodeNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName: string;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param callsControllerFunctionName
     */
    public initialize (callsControllerFunctionName: string): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        return JavaScriptObfuscator.obfuscate(
            format(SelfDefendingTemplate(), {
                selfDefendingFunctionName: RandomGeneratorUtils.getRandomVariableName(),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            }),
            {
                ...NO_CUSTOM_NODES_PRESET,
                seed: this.options.seed
            }
        ).getObfuscatedCode();
    }
}
