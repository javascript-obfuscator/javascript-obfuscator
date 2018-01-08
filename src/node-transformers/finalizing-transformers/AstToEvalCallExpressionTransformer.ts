import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';
import jsStringEscape = require('js-string-escape');

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class AstToEvalCallExpressionTransformer extends AbstractNodeTransformer {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                if (parentNode && node.isEvalRoot && NodeGuards.isFunctionDeclarationNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param {FunctionDeclaration} functionDeclaration
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (functionDeclaration: ESTree.FunctionDeclaration, parentNode: ESTree.Node): ESTree.Node {
        const targetAst: ESTree.Statement[] = functionDeclaration.body.body;
        const code: string = NodeUtils.convertStructureToCode(targetAst);

        return Nodes.getCallExpressionNode(
            Nodes.getIdentifierNode('eval'),
            [
                Nodes.getLiteralNode(jsStringEscape(code))
            ]
        );
    }
}
