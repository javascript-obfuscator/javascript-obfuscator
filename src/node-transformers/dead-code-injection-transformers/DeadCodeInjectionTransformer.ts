import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IVisitor } from '../../interfaces/IVisitor';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

@injectable()
export class DeadCodeInjectionTransformer extends AbstractNodeTransformer {
    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            leave: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isBlockStatementNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param blockStatementNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (blockStatementNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node {
        if (
            !this.options.deadCodeInjection ||
            RandomGeneratorUtils.getMathRandom() > this.options.deadCodeInjectionThreshold
        ) {
            return blockStatementNode;
        }

        return blockStatementNode;
    }
}
