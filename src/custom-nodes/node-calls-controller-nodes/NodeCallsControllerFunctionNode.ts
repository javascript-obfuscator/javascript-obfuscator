import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomNodeObfuscator } from '../../interfaces/custom-nodes/ICustomNodeObfuscator';
import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

import { initializable } from '../../decorators/Initializable';

import { SingleNodeCallControllerTemplate } from '../common/templates/SingleNodeCallControllerTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class NodeCallsControllerFunctionNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName!: string;

    /**
     * @type {ObfuscationEvent}
     */
    @initializable()
    private appendEvent!: ObfuscationEvent;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {ICustomNodeObfuscator} customNodeObfuscator
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.ICustomNodeObfuscator) customNodeObfuscator: ICustomNodeObfuscator,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            customNodeFormatter,
            customNodeObfuscator,
            randomGenerator,
            options
        );
    }

    /**
     * @param {ObfuscationEvent} appendEvent
     * @param {string} callsControllerFunctionName
     */
    public initialize (appendEvent: ObfuscationEvent, callsControllerFunctionName: string): void {
        this.appendEvent = appendEvent;
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
        if (this.appendEvent === ObfuscationEvent.AfterObfuscation) {
            return this.customNodeObfuscator.obfuscateTemplate(
                this.customNodeFormatter.formatTemplate(SingleNodeCallControllerTemplate(), {
                    singleNodeCallControllerFunctionName: this.callsControllerFunctionName
                })
            );
        }

        return this.customNodeFormatter.formatTemplate(SingleNodeCallControllerTemplate(), {
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
