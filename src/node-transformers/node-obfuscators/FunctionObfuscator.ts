import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscatorReplacer } from '../../interfaces/node-transformers/IObfuscatorReplacer';
import { IObfuscatorReplacerWithStorage } from '../../interfaces/node-transformers/IObfuscatorReplacerWithStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

/**
 * replaces:
 *     function foo (argument1) { return argument1; };
 *
 * on:
 *     function foo (_0x12d45f) { return _0x12d45f; };
 *
 */
@injectable()
export class FunctionObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IObfuscatorReplacerWithStorage}
     */
    private readonly identifierReplacer: IObfuscatorReplacerWithStorage;

    /**
     * @param nodeObfuscatorsReplacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) nodeObfuscatorsReplacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscatorReplacerWithStorage>nodeObfuscatorsReplacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param functionNode
     */
    public transformNode (functionNode: ESTree.Function): void {
        const nodeIdentifier: string = RandomGeneratorUtils.getRandomString(7);

        this.storeFunctionParams(functionNode, nodeIdentifier);
        this.replaceFunctionParams(functionNode, nodeIdentifier);
    }

    /**
     * @param functionNode
     * @param nodeIdentifier
     */
    private storeFunctionParams (functionNode: ESTree.Function, nodeIdentifier: string): void {
        functionNode.params
            .forEach((paramsNode: ESTree.Node) => {
                NodeUtils.typedTraverse(paramsNode, NodeType.Identifier, {
                    enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name, nodeIdentifier)
                });
            });
    }

    /**
     * @param functionNode
     * @param nodeIdentifier
     */
    private replaceFunctionParams (functionNode: ESTree.Function, nodeIdentifier: string): void {
        const traverseVisitor: estraverse.Visitor = {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
                    const newNodeName: string = this.identifierReplacer.replace(node.name, nodeIdentifier);

                    if (node.name !== newNodeName) {
                        node.name = newNodeName;
                        node.obfuscated = true;
                    }
                }
            }
        };

        functionNode.params.forEach((paramsNode: ESTree.Node) => estraverse.replace(paramsNode, traverseVisitor));

        estraverse.replace(functionNode.body, traverseVisitor);
    }
}
