import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeLexicalScopeUtils } from '../../node/NodeLexicalScopeUtils';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class ObjectPatternPropertiesTransformer extends AbstractNodeTransformer {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isPropertyNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * replaces:
     *     const {foo} = bar;
     *
     * on:
     *     const {foo: foo} = bar;
     *
     * @param {Property} propertyNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (propertyNode: ESTree.Property, parentNode: ESTree.Node): ESTree.Node {
        if (!NodeGuards.isObjectPatternNode(parentNode) || !propertyNode.shorthand) {
            return propertyNode;
        }

        if (!this.options.renameGlobals) {
            const lexicalScope: TNodeWithLexicalScope | undefined = NodeLexicalScopeUtils.getLexicalScope(propertyNode);
            const shouldNotTransformGlobalPropertyNode: boolean = !!lexicalScope && NodeGuards.isProgramNode(lexicalScope);

            if (shouldNotTransformGlobalPropertyNode) {
                return propertyNode;
            }
        }

        propertyNode.shorthand = false;
        propertyNode.value = NodeUtils.clone(propertyNode.value);

        NodeUtils.parentizeNode(propertyNode.value, propertyNode);

        return propertyNode;
    }
}
