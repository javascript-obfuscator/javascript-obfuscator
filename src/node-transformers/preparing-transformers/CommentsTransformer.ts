import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class CommentsTransformer extends AbstractNodeTransformer {
    /**
     * @type {string[]}
     */
    private static readonly preservedWords: string[] = [
        '@license',
        '@preserve'
    ];

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
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Preparing:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode && NodeGuards.isNodeWithComments(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * Removes all comments from node except comments that contain
     * `@license`, `@preserve` or `javascript-obfuscator` words
     *
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node {
        if (node.leadingComments) {
            node.leadingComments = this.transformComments(node.leadingComments);
        }

        if (node.trailingComments) {
            node.trailingComments = this.transformComments(node.trailingComments);
        }

        return node;
    }

    /**
     * @param {Comment[]} comments
     * @returns {Comment[]}
     */
    private transformComments (comments: ESTree.Comment[]): ESTree.Comment[] {
        return comments.filter((comment: ESTree.Comment) =>
            CommentsTransformer.preservedWords
                .some((preservedWord: string) => comment.value.includes(preservedWord))
        );
    }
}
