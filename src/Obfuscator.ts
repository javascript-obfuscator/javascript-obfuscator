import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

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

import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';

@injectable()
export class Obfuscator implements IObfuscator {
    /**
     * @type {IStorage<ICustomNode>}
     */
    private readonly customNodesStorage: IStorage<ICustomNode>;

    /**
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {IStackTraceAnalyzer}
     */
    private readonly stackTraceAnalyzer: IStackTraceAnalyzer;

    /**
     * @param obfuscationEventEmitter
     * @param stackTraceAnalyzer
     * @param customNodesStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.IStackTraceAnalyzer) stackTraceAnalyzer: IStackTraceAnalyzer,
        @inject(ServiceIdentifiers.IStorage) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.customNodesStorage = customNodesStorage;
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

        // zero pass: parentize all nodes
        NodeUtils.parentize(astTree);

        // prepare custom nodes
        this.customNodesStorage.initialize(this.stackTraceAnalyzer.analyze(astTree.body));
        this.customNodesStorage
            .getStorage()
            .forEach((customNode: ICustomNode) => {
                this.obfuscationEventEmitter.once(customNode.getAppendEvent(), customNode.appendNode.bind(customNode));
            });

        this.obfuscationEventEmitter.emit(ObfuscationEvents.BeforeObfuscation, astTree);

        // first pass: control flow flattening
        if (this.options.controlFlowFlattening) {
            this.transformAstTree(astTree, VisitorDirection.leave, new NodeControlFlowTransformersFactory(
                this.customNodesStorage,
                this.options
            ));
        }

        // second pass: nodes obfuscation
        this.transformAstTree(astTree, VisitorDirection.enter, new NodeObfuscatorsFactory(
            this.customNodesStorage,
            this.options
        ));

        this.obfuscationEventEmitter.emit(ObfuscationEvents.AfterObfuscation, astTree);

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
