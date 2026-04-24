import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';

import {
    CORE_JS_BUILTINS,
    GLOBAL_FUNCTIONS,
    BROWSER_API_OBJECTS,
    NODE_API_OBJECTS
} from '../../constants/BuiltinIdentifierNames';

@injectable()
export class BuiltinsObfuscationTransformer extends AbstractNodeTransformer {
    /**
     * @type {Set<string>}
     */
    private builtinNames!: Set<string>;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor(
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.obfuscateBuiltins) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                this.builtinNames = this.buildBuiltinNamesSet();

                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isIdentifierNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * Replaces built-in identifier references with globalThis['name'] computed access.
     *
     * replaces:
     *     console.log('test')
     *
     * on:
     *     globalThis['console']['log']('test')
     *
     * The literal 'console' will be obfuscated by StringArrayTransformer.
     *
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode(identifierNode: ESTree.Identifier, parentNode: ESTree.Node): ESTree.Node {
        if (NodeMetadata.isIgnoredNode(identifierNode)) {
            return identifierNode;
        }

        const identifierName: string = identifierNode.name;

        if (!this.builtinNames.has(identifierName)) {
            return identifierNode;
        }

        if (this.isReservedName(identifierName)) {
            return identifierNode;
        }

        // Skip if identifier is a property of a member expression (e.g., obj.Array)
        if (this.isPropertyOfMemberExpression(identifierNode, parentNode)) {
            return identifierNode;
        }

        // Skip if identifier is being declared (e.g., var console = ...)
        if (this.isVariableDeclaration(identifierNode, parentNode)) {
            return identifierNode;
        }

        // Skip if identifier is a parameter name
        if (this.isParameterName(identifierNode, parentNode)) {
            return identifierNode;
        }

        // Skip if identifier is a key in object expression (e.g., { console: 1 })
        if (this.isObjectPropertyKey(identifierNode, parentNode)) {
            return identifierNode;
        }

        // Skip if identifier is a label
        if (NodeGuards.isLabeledStatementNode(parentNode) && parentNode.label === identifierNode) {
            return identifierNode;
        }

        // Replace: identifier -> globalThis['identifier']
        return NodeFactory.memberExpressionNode(
            NodeFactory.identifierNode('globalThis'),
            NodeFactory.literalNode(identifierName),
            true
        );
    }

    /**
     * @returns {Set<string>}
     */
    private buildBuiltinNamesSet(): Set<string> {
        const builtins: Set<string> = new Set([
            ...CORE_JS_BUILTINS,
            ...GLOBAL_FUNCTIONS
        ]);

        const target: string = this.options.target;

        if (target === ObfuscationTarget.Browser
            || target === ObfuscationTarget.BrowserNoEval
            || target === ObfuscationTarget.ServiceWorker
        ) {
            for (const name of BROWSER_API_OBJECTS) {
                builtins.add(name);
            }
        }

        if (target === ObfuscationTarget.Node) {
            for (const name of NODE_API_OBJECTS) {
                builtins.add(name);
            }
        }

        return builtins;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName(name: string): boolean {
        return this.options.reservedNames.some(
            (reservedName: string) => new RegExp(reservedName).test(name)
        );
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {boolean}
     */
    private isPropertyOfMemberExpression(identifierNode: ESTree.Identifier, parentNode: ESTree.Node): boolean {
        return NodeGuards.isMemberExpressionNode(parentNode)
            && parentNode.property === identifierNode
            && !parentNode.computed;
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {boolean}
     */
    private isVariableDeclaration(identifierNode: ESTree.Identifier, parentNode: ESTree.Node): boolean {
        if (NodeGuards.isVariableDeclaratorNode(parentNode) && parentNode.id === identifierNode) {
            return true;
        }

        if (NodeGuards.isFunctionDeclarationNode(parentNode) && parentNode.id === identifierNode) {
            return true;
        }

        if (NodeGuards.isClassDeclarationNode(parentNode) && parentNode.id === identifierNode) {
            return true;
        }

        if (NodeGuards.isImportSpecifierNode(parentNode)) {
            return true;
        }

        return false;
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {boolean}
     */
    private isParameterName(identifierNode: ESTree.Identifier, parentNode: ESTree.Node): boolean {
        if (NodeGuards.isFunctionExpressionNode(parentNode) || NodeGuards.isFunctionDeclarationNode(parentNode)
            || NodeGuards.isArrowFunctionExpressionNode(parentNode)
        ) {
            return parentNode.params.includes(identifierNode);
        }

        return false;
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {boolean}
     */
    private isObjectPropertyKey(identifierNode: ESTree.Identifier, parentNode: ESTree.Node): boolean {
        return NodeGuards.isPropertyNode(parentNode)
            && parentNode.key === identifierNode
            && !parentNode.computed;
    }
}
