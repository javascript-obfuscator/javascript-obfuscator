import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TStatement } from '../../types/node/TStatement';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ControlFlowCustomNode } from '../../enums/custom-nodes/ControlFlowCustomNode';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class BlockStatementControlFlowTransformer extends AbstractNodeTransformer {
    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @type {TControlFlowCustomNodeFactory}
     */
    private readonly controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory;

    /**
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
        this.arrayUtils = arrayUtils;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private static isProhibitedStatementNode (node: ESTree.Node): boolean {
        const isBreakOrContinueStatement: boolean = NodeGuards.isBreakStatementNode(node)
            || NodeGuards.isContinueStatementNode(node);
        const isVariableDeclarationWithLetOrConstKind: boolean = NodeGuards.isVariableDeclarationNode(node)
            && (node.kind === 'const' || node.kind === 'let');
        const isClassDeclaration: boolean = NodeGuards.isClassDeclarationNode(node);

        return NodeGuards.isFunctionDeclarationNode(node)
            || isBreakOrContinueStatement
            || isVariableDeclarationWithLetOrConstKind
            || isClassDeclaration;
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @returns {boolean}
     */
    private static canTransformBlockStatementNode (blockStatementNode: ESTree.BlockStatement): boolean {
        let canTransform: boolean = true;

        estraverse.traverse(blockStatementNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (NodeGuards.isWhileStatementNode(node)) {
                    return estraverse.VisitorOption.Skip;
                }

                if (BlockStatementControlFlowTransformer.isProhibitedStatementNode(node)) {
                    canTransform = false;
                }
            }
        });

        if (blockStatementNode.body.length <= 4) {
            canTransform = false;
        }

        return canTransform;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.ControlFlowFlattening:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode && NodeGuards.isBlockStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (blockStatementNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node {
        if (
            this.randomGenerator.getMathRandom() > this.options.controlFlowFlatteningThreshold ||
            !BlockStatementControlFlowTransformer.canTransformBlockStatementNode(blockStatementNode)
        ) {
            return blockStatementNode;
        }

        const blockStatementBody: ESTree.Statement[] = blockStatementNode.body;
        const originalKeys: number[] = this.arrayUtils.createWithRange(blockStatementBody.length);
        const shuffledKeys: number[] = this.arrayUtils.shuffle(originalKeys);
        const originalKeysIndexesInShuffledArray: number[] = originalKeys.map((key: number) => shuffledKeys.indexOf(key));
        const blockStatementControlFlowFlatteningCustomNode: ICustomNode = this.controlFlowCustomNodeFactory(
            ControlFlowCustomNode.BlockStatementControlFlowFlatteningNode
        );

        blockStatementControlFlowFlatteningCustomNode.initialize(
            blockStatementBody,
            shuffledKeys,
            originalKeysIndexesInShuffledArray
        );

        const newBlockStatementNode: TStatement = blockStatementControlFlowFlatteningCustomNode.getNode()[0];

        NodeUtils.parentizeNode(newBlockStatementNode, parentNode);

        return newBlockStatementNode;
    }
}
