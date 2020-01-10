import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';

import { initializable } from '../../decorators/Initializable';

import { DebugProtectionFunctionCallTemplate } from '../../templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class DebugProtectionFunctionCallNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private callsControllerFunctionName!: string;

    /**
     * @type {string}
     */
    @initializable()
    private debugProtectionFunctionName!: string;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }

    /**
     * @param {string} debugProtectionFunctionName
     * @param {string} callsControllerFunctionName
     */
    public initialize (debugProtectionFunctionName: string, callsControllerFunctionName: string): void {
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.callsControllerFunctionName = callsControllerFunctionName;
    }

    /**
     * @param {string} nodeTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure (nodeTemplate: string): TStatement[] {
        return NodeUtils.convertCodeToStructure(nodeTemplate);
    }

    /**
     * @returns {string}
     */
    protected getNodeTemplate (): string {
        return this.customNodeFormatter.formatTemplate(DebugProtectionFunctionCallTemplate(), {
            debugProtectionFunctionName: this.debugProtectionFunctionName,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
