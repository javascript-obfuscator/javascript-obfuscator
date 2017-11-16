import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { IdentifierObfuscatingReplacer } from '../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

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
     * @param {TIdentifierObfuscatingReplacerFactory} identifierObfuscatingReplacerFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
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
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                if (
                    parentNode && (
                        NodeGuards.isFunctionDeclarationNode(node) ||
                        NodeGuards.isFunctionExpressionNode(node) ||
                        NodeGuards.isArrowFunctionExpressionNode(node)
                    )
                ) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param {Function} functionNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (functionNode: ESTree.Function, parentNode: ESTree.Node): ESTree.Node {
        const nodeIdentifier: number = this.nodeIdentifier++;

        this.storeFunctionParams(functionNode, nodeIdentifier);
        this.replaceFunctionParams(functionNode, nodeIdentifier);

        return functionNode;
    }

    /**
     * @param {Function} functionNode
     * @param {number} nodeIdentifier
     */
    private storeFunctionParams (functionNode: ESTree.Function, nodeIdentifier: number): void {
        functionNode.params
            .forEach((paramsNode: ESTree.Node) => {
                if (NodeGuards.isObjectPatternNode(paramsNode)) {
                    return estraverse.VisitorOption.Skip;
                }

                estraverse.traverse(paramsNode, {
                    enter: (node: ESTree.Node): any => {
                        if (NodeGuards.isAssignmentPatternNode(node) && NodeGuards.isIdentifierNode(node.left)) {
                            this.identifierObfuscatingReplacer.storeNames(node.left.name, nodeIdentifier);

                            return estraverse.VisitorOption.Skip;
                        }

                        if (NodeGuards.isIdentifierNode(node)) {
                            this.identifierObfuscatingReplacer.storeNames(node.name, nodeIdentifier);
                        }
                    }
                });
            });
    }

    /**
     * @param {Property[]} properties
     * @param {Set<string>} ignoredIdentifierNamesSet
     */
    private addIdentifiersToIgnoredIdentifierNamesSet (
        properties: ESTree.Property[],
        ignoredIdentifierNamesSet: Set<string>
    ): void {
        properties.forEach((property: ESTree.Property) => {
            if (!NodeGuards.isIdentifierNode(property.key)) {
                return;
            }

            ignoredIdentifierNamesSet.add(property.key.name);
        });
    }

    /**
     * @param {Function} functionNode
     * @param {number} nodeIdentifier
     */
    private replaceFunctionParams (functionNode: ESTree.Function, nodeIdentifier: number): void {
        const ignoredIdentifierNamesSet: Set<string> = new Set();

        const replaceVisitor: estraverse.Visitor = {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): any => {
                if (NodeGuards.isObjectPatternNode(node)) {
                    this.addIdentifiersToIgnoredIdentifierNamesSet(node.properties, ignoredIdentifierNamesSet);
                }

                if (
                    parentNode &&
                    NodeGuards.isReplaceableIdentifierNode(node, parentNode) &&
                    !ignoredIdentifierNamesSet.has(node.name)
                ) {
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
