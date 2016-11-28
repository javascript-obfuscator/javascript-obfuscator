import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TVisitorDirection } from './types/TVisitorDirection';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from './interfaces/IObfuscationEventEmitter';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/IOptions';
import { INodeTransformer } from './interfaces/INodeTransformer';
import { INodeTransformersFactory } from './interfaces/INodeTransformersFactory';
import { IStorage } from './interfaces/IStorage';

import { ObfuscationEvents } from './enums/ObfuscationEvents';
import { VisitorDirection } from './enums/VisitorDirection';

import { NodeControlFlowTransformersFactory } from './node-transformers/node-control-flow-transformers/factory/NodeControlFlowTransformersFactory';
import { NodeObfuscatorsFactory } from './node-transformers/node-obfuscators/factory/NodeObfuscatorsFactory';

import { Node } from './node/Node';

export class Obfuscator implements IObfuscator {
    /**
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param obfuscationEventEmitter
     * @param options
     */
    constructor (
        obfuscationEventEmitter: IObfuscationEventEmitter,
        options: IOptions
    ) {
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.options = options;
    }

    /**
     * @param astTree
     * @param customNodesStorage
     * @returns {ESTree.Program}
     */
    public obfuscateAstTree (astTree: ESTree.Program, customNodesStorage: IStorage<ICustomNode>): ESTree.Program {
        if (Node.isProgramNode(astTree) && !astTree.body.length) {
            return astTree;
        }

        // prepare custom nodes
        customNodesStorage
            .getStorage()
            .forEach((customNode: ICustomNode) => {
                this.obfuscationEventEmitter.once(customNode.getAppendEvent(), customNode.appendNode.bind(customNode));
            });

        this.obfuscationEventEmitter.emit(ObfuscationEvents.BeforeObfuscation, astTree);

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
