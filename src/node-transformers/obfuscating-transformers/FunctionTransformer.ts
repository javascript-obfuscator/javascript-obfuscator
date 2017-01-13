import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscationReplacer } from '../../interfaces/node-transformers/IObfuscationReplacer';
import { IObfuscationReplacerWithStorage } from '../../interfaces/node-transformers/IObfuscationReplacerWithStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscationReplacers';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

/**
 * replaces:
 *     function foo (argument1) { return argument1; };
 *
 * on:
 *     function foo (_0x12d45f) { return _0x12d45f; };
 *
 */
@injectable()
export class FunctionTransformer extends AbstractNodeTransformer {
    /**
     * @type {IObfuscationReplacerWithStorage}
     */
    private readonly identifierReplacer: IObfuscationReplacerWithStorage;

    /**
     * @param nodeObfuscatorsReplacersFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) nodeObfuscatorsReplacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscationReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscationReplacerWithStorage>nodeObfuscatorsReplacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param functionNode
     * @returns {ESTree.Node}
     */
    public transformNode (functionNode: ESTree.Function): ESTree.Node {
        const nodeIdentifier: number = this.nodeIdentifier++;

        this.storeFunctionParams(functionNode, nodeIdentifier);
        this.replaceFunctionParams(functionNode, nodeIdentifier);

        return functionNode;
    }

    /**
     * @param functionNode
     * @param nodeIdentifier
     */
    private storeFunctionParams (functionNode: ESTree.Function, nodeIdentifier: number): void {
        functionNode.params
            .forEach((paramsNode: ESTree.Node) => {
                if (Node.isObjectPatternNode(paramsNode)) {
                    return estraverse.VisitorOption.Skip;
                }

                estraverse.traverse(paramsNode, {
                    enter: (node: ESTree.Node): any => {
                        if (Node.isAssignmentPatternNode(node) && Node.isIdentifierNode(node.left)) {
                            this.identifierReplacer.storeNames(node.left.name, nodeIdentifier);

                            return estraverse.VisitorOption.Skip;
                        }

                        if (Node.isIdentifierNode(node)) {
                            this.identifierReplacer.storeNames(node.name, nodeIdentifier);
                        }
                    }
                });
            });
    }

    /**
     * @param functionNode
     * @param nodeIdentifier
     */
    private replaceFunctionParams (functionNode: ESTree.Function, nodeIdentifier: number): void {
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
