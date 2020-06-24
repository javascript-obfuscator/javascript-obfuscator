import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';
import * as estraverse from 'estraverse';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

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
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.filterComment = this.filterComment.bind(this);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Initializing:
                return {
                    leave: (node: ESTree.Node): ESTree.Node | undefined => {
                        if (NodeGuards.isProgramNode(node)) {
                            return this.transformNode(node);
                        }
                    }
                };

            case NodeTransformationStage.Finalizing:
                return {
                    leave: (node: ESTree.Node): ESTree.Node | undefined => {
                        if (NodeGuards.isProgramNode(node)) {
                            return this.filterComments(node);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * Moves comments to their nodes
     */
    public transformNode (rootNode: ESTree.Program): ESTree.Node {
        if (!rootNode.comments || !rootNode.comments.length) {
            return rootNode;
        }

        const comments: ESTree.Comment[] = rootNode.comments.reverse();

        if (comments.length === 0) {
            return rootNode;
        }

        if (!rootNode.body.length) {
            rootNode.leadingComments = comments;

            return rootNode;
        }

        let isFirstNode: boolean = true;

        estraverse.traverse(rootNode, {
            enter: (node: ESTree.Node): void => {
                if (node === rootNode) {
                    return;
                }

                const commentIdx: number = comments.findIndex((comment: ESTree.Comment) =>
                    comment.range && node.range && comment.range[0] < node.range[0]
                );

                if (commentIdx >= 0) {
                    (isFirstNode ? rootNode : node).leadingComments =
                        comments.splice(commentIdx, comments.length - commentIdx).reverse();
                }

                isFirstNode = false;
            }
        });

        if (comments.length > 0) {
            rootNode.trailingComments = comments.reverse();
        }

        return rootNode;
    }

    /**
     * Removes all comments from node except comments that contain preserved words
     *
     * @param {Node} rootNode
     * @returns {NodeGuards}
     */
    public filterComments (rootNode: ESTree.Program): ESTree.Node {
        estraverse.traverse(rootNode, {
            enter: (node: ESTree.Node): void => {
                if (node.leadingComments) {
                    node.leadingComments = node.leadingComments?.filter(this.filterComment);
                }

                if (node.trailingComments) {
                    node.trailingComments = node.trailingComments?.filter(this.filterComment);
                }
            }
        });

        return rootNode;
    }

    /**
     * @param {ESTree.Comment} comment
     * @returns {boolean}
     */
    private filterComment (comment: ESTree.Comment): boolean {
        return CommentsTransformer.preservedWords
            .some((preservedWord: string) => comment.value.includes(preservedWord));
    }
}
