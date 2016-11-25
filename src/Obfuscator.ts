import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TCustomNodesFactory } from './types/TCustomNodesFactory';
import { TVisitorDirection } from './types/TVisitorDirection';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from './interfaces/IObfuscationEventEmitter';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/IOptions';
import { INodeTransformer } from './interfaces/INodeTransformer';
import { INodeTransformersFactory } from './interfaces/INodeTransformersFactory';
import { IStackTraceAnalyzer } from './interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';

import { ObfuscationEvents } from './enums/ObfuscationEvents';
import { VisitorDirection } from './enums/VisitorDirection';

import { ConsoleOutputCustomNodesFactory } from './custom-nodes/console-output-nodes/factory/ConsoleOutputCustomNodesFactory';
import { DebugProtectionCustomNodesFactory } from './custom-nodes/debug-protection-nodes/factory/DebugProtectionCustomNodesFactory';
import { DomainLockCustomNodesFactory } from './custom-nodes/domain-lock-nodes/factory/DomainLockCustomNodesFactory';
import { NodeControlFlowTransformersFactory } from './node-transformers/node-control-flow-transformers/factory/NodeControlFlowTransformersFactory';
import { NodeObfuscatorsFactory } from './node-transformers/node-obfuscators/factory/NodeObfuscatorsFactory';
import { SelfDefendingCustomNodesFactory } from './custom-nodes/self-defending-nodes/factory/SelfDefendingCustomNodesFactory';
import { StringArrayCustomNodesFactory } from './custom-nodes/string-array-nodes/factory/StringArrayCustomNodesFactory';

import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';
import { StackTraceAnalyzer } from './stack-trace-analyzer/StackTraceAnalyzer';
import { ObfuscationEventEmitter } from './event-emitters/ObfuscationEventEmitter';

export class Obfuscator implements IObfuscator {
    /**
     * @type {TCustomNodesFactory[]}
     */
    private static readonly customNodesFactories: TCustomNodesFactory[] = [
        DomainLockCustomNodesFactory,
        SelfDefendingCustomNodesFactory,
        ConsoleOutputCustomNodesFactory,
        DebugProtectionCustomNodesFactory,
        StringArrayCustomNodesFactory
    ];

    /**
     * @type {Map<string, AbstractCustomNode>}
     */
    private customNodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param options
     */
    constructor (options: IOptions) {
        this.options = options;
    }

    /**
     * @param astTree
     * @returns {ESTree.Program}
     */
    public obfuscateAstTree (astTree: ESTree.Program): ESTree.Program {
        if (Node.isProgramNode(astTree) && !astTree.body.length) {
            return astTree;
        }

        NodeUtils.parentize(astTree);

        const obfuscationEventEmitter: IObfuscationEventEmitter = new ObfuscationEventEmitter();
        const stackTraceAnalyzer: IStackTraceAnalyzer = new StackTraceAnalyzer();

        this.initializeCustomNodes(obfuscationEventEmitter, stackTraceAnalyzer.analyze(astTree.body));

        obfuscationEventEmitter.emit(ObfuscationEvents.BeforeObfuscation, astTree);

        // first pass: control flow flattening
        if (this.options.controlFlowFlattening) {
            this.transformAstTree(astTree, VisitorDirection.leave, new NodeControlFlowTransformersFactory(
                this.customNodes,
                this.options
            ));
        }

        // second pass: nodes obfuscation
        this.transformAstTree(astTree, VisitorDirection.enter, new NodeObfuscatorsFactory(
            this.customNodes,
            this.options
        ));

        obfuscationEventEmitter.emit(ObfuscationEvents.AfterObfuscation, astTree);

        return astTree;
    }

    /**
     * @param obfuscationEventEmitter
     * @param stackTraceData
     */
    private initializeCustomNodes (obfuscationEventEmitter: IObfuscationEventEmitter, stackTraceData: IStackTraceData[]): void {
        const customNodes: [string, ICustomNode][] = [];

        Obfuscator.customNodesFactories.forEach((customNodesFactoryConstructor: TCustomNodesFactory) => {
            const customNodesFactory: Map <string, ICustomNode> | undefined = new customNodesFactoryConstructor(
                this.options
            ).initializeCustomNodes(
                obfuscationEventEmitter,
                stackTraceData
            );

            if (!customNodesFactory) {
                return;
            }

            customNodes.push(...customNodesFactory);
        });

        this.customNodes = new Map <string, ICustomNode> (customNodes);
    }

    /**
     * @param astTree
     * @param direction
     * @param nodeTransformersFactory
     */
    private transformAstTree (
        astTree: ESTree.Program,
        direction: TVisitorDirection,
        nodeTransformersFactory: INodeTransformersFactory
    ): void {
        estraverse.traverse(astTree, {
            [direction]: (node: ESTree.Node, parentNode: ESTree.Node): void => {
                const nodeTransformers: INodeTransformer[] = nodeTransformersFactory.initializeNodeTransformers(node.type);

                nodeTransformers.forEach((nodeTransformer: INodeTransformer) => {
                    nodeTransformer.transformNode(node, parentNode);
                });
            }
        });
    }
}
