import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TVisitorDirection } from './types/TVisitorDirection';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from './interfaces/IObfuscationEventEmitter';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/IOptions';
import { INodeTransformer } from './interfaces/INodeTransformer';
import { INodeTransformersFactory } from './interfaces/INodeTransformersFactory';
import { IStackTraceAnalyzer } from './interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStorage } from './interfaces/IStorage';

import { ObfuscationEvents } from './enums/ObfuscationEvents';
import { VisitorDirection } from './enums/VisitorDirection';

import { NodeControlFlowTransformersFactory } from './node-transformers/node-control-flow-transformers/factory/NodeControlFlowTransformersFactory';
import { NodeObfuscatorsFactory } from './node-transformers/node-obfuscators/factory/NodeObfuscatorsFactory';

import { CustomNodesStorage } from './storages/custom-nodes/CustomNodesStorage';
import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';
import { StackTraceAnalyzer } from './stack-trace-analyzer/StackTraceAnalyzer';
import { ObfuscationEventEmitter } from './event-emitters/ObfuscationEventEmitter';

export class Obfuscator implements IObfuscator {
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
        const customNodesStorage: IStorage<ICustomNode> = new CustomNodesStorage(this.options);

        customNodesStorage.initialize(obfuscationEventEmitter, stackTraceAnalyzer.analyze(astTree.body));

        obfuscationEventEmitter.emit(ObfuscationEvents.BeforeObfuscation, astTree);

        // first pass: control flow flattening
        if (this.options.controlFlowFlattening) {
            this.transformAstTree(astTree, VisitorDirection.leave, new NodeControlFlowTransformersFactory(
                customNodesStorage,
                this.options
            ));
        }

        // second pass: nodes obfuscation
        this.transformAstTree(astTree, VisitorDirection.enter, new NodeObfuscatorsFactory(
            customNodesStorage,
            this.options
        ));

        obfuscationEventEmitter.emit(ObfuscationEvents.AfterObfuscation, astTree);

        return astTree;
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
