import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/IVisitor';

import { IdentifierObfuscatingReplacer } from '../../enums/container/node-transformers/IdentifierObfuscatingReplacer';

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
     * @type {IIdentifierObfuscatingReplacer}
     */
    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    /**
     * @param identifierObfuscatingReplacerFactory
     * @param randomGenerator
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
            identifierObfuscatingReplacerFactory: TIdentifierObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(
            IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer
        );
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (
                    Node.isFunctionDeclarationNode(node) ||
                    Node.isFunctionExpressionNode(node) ||
                    Node.isArrowFunctionExpressionNode(node)
                ) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param functionNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (functionNode: ESTree.Function, parentNode: ESTree.Node): ESTree.Node {
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
                            this.identifierObfuscatingReplacer.storeNames(node.left.name, nodeIdentifier);

                            return estraverse.VisitorOption.Skip;
                        }

                        if (Node.isIdentifierNode(node)) {
                            this.identifierObfuscatingReplacer.storeNames(node.name, nodeIdentifier);
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
        const replaceVisitor: estraverse.Visitor = {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
                    const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
                    const newIdentifierName: string = newIdentifier.name;

                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        node.obfuscatedNode = true;
                    }
                }
            }
        };

        functionNode.params.forEach((paramsNode: ESTree.Node) => estraverse.replace(paramsNode, replaceVisitor));

        estraverse.replace(functionNode.body, replaceVisitor);
    }
}
