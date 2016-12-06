import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../../types/node/TNodeWithBlockStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from '../../../interfaces/event-emitters/IObfuscationEventEmitter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { initializable } from '../../../decorators/Initializable';

import { CustomNodes } from '../../../enums/container/CustomNodes';

import { AbstractCustomNodeGroup } from '../../AbstractCustomNodeGroup';
import { NodeAppender } from '../../../node/NodeAppender';
import { Utils } from '../../../Utils';

@injectable()
export class DebugProtectionCustomNodeGroup extends AbstractCustomNodeGroup {
    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @type {Map<string, ICustomNode>}
     */
    @initializable()
    protected customNodes: Map <string, ICustomNode>;

    /**
     * @type {string}
     */
    protected readonly groupName: string = 'debugProtectionCustomNodeGroup';

    /**
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

    /**
     * @param customNodeFactory
     * @param obfuscationEventEmitter
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['Factory<ICustomNode>']) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeFactory = customNodeFactory;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
    }

    /**
     * @param stackTraceData
     */
    public initialize (stackTraceData: IStackTraceData[]): void {
        const debugProtectionFunctionName: string = Utils.getRandomVariableName();

        const debugProtectionFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.DebugProtectionFunctionNode);
        const debugProtectionFunctionCallNode: ICustomNode = this.customNodeFactory(CustomNodes.DebugProtectionFunctionCallNode);
        const debugProtectionFunctionIntervalNode: ICustomNode = this.customNodeFactory(CustomNodes.DebugProtectionFunctionIntervalNode);

        debugProtectionFunctionNode.initialize(debugProtectionFunctionName);
        debugProtectionFunctionCallNode.initialize(debugProtectionFunctionName);
        debugProtectionFunctionIntervalNode.initialize(debugProtectionFunctionName);

        const customNodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ([
            ['debugProtectionFunctionNode', debugProtectionFunctionNode],
            ['debugProtectionFunctionCallNode', debugProtectionFunctionCallNode]
        ]);

        this.obfuscationEventEmitter.once(
            this.appendEvent,
            (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]) => {
                if (!this.options.debugProtection) {
                    return;
                }

                // debugProtectionFunctionNode append
                NodeAppender.appendNode(blockScopeNode, debugProtectionFunctionNode.getNode());

                // debugProtectionFunctionCallNode append
                NodeAppender.appendNode(blockScopeNode, debugProtectionFunctionCallNode.getNode());
            }
        );

        if (this.options.debugProtectionInterval) {
            customNodes.set('debugProtectionFunctionIntervalNode', debugProtectionFunctionIntervalNode);

            this.obfuscationEventEmitter.once(
                this.appendEvent,
                (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]) => {
                    if (!this.options.debugProtection) {
                        return;
                    }

                    // debugProtectionFunctionIntervalNode append
                    let programBodyLength: number = blockScopeNode.body.length,
                        randomIndex: number = Utils.getRandomInteger(0, programBodyLength);

                    NodeAppender.insertNodeAtIndex(blockScopeNode, debugProtectionFunctionIntervalNode.getNode(), randomIndex);
                }
            );
        }

        this.customNodes = customNodes;
    }
}
