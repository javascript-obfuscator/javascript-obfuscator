import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowReplacerFactory } from '../../types/container/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/TControlFlowStorageFactory';
import { TCustomNodeFactory } from '../../types/container/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { CustomNodes } from '../../enums/container/CustomNodes';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeControlFlowReplacers } from '../../enums/container/NodeControlFlowReplacers';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';
import { Utils } from '../../utils/Utils';

@injectable()
export class FunctionControlFlowTransformer extends AbstractNodeTransformer {
    /**
     * @type {Map <string, NodeControlFlowReplacers>}
     */
    private static readonly controlFlowReplacersMap: Map <string, NodeControlFlowReplacers> = new Map([
        [NodeType.BinaryExpression, NodeControlFlowReplacers.BinaryExpressionControlFlowReplacer],
        [NodeType.CallExpression, NodeControlFlowReplacers.CallExpressionControlFlowReplacer],
        [NodeType.LogicalExpression, NodeControlFlowReplacers.LogicalExpressionControlFlowReplacer]
    ]);

    /**
     * @type {number}
     */
    private static readonly hostNodeSearchMinDepth: number = 2;

    /**
     * @type {number}
     */
    private static readonly hostNodeSearchMaxDepth: number = 10;

    /**
     * @type {Map<ESTree.Node, IStorage<ICustomNode>>}
     */
    private controlFlowData: Map <ESTree.Node, IStorage<ICustomNode>> = new Map();

    /**
     * @type {TNodeWithBlockStatement[]}
     */
    private readonly hostNodesWithControlFlowNode: TNodeWithBlockStatement[] = [];

    /**
     * @type {TControlFlowReplacerFactory}
     */
    private readonly controlFlowReplacerFactory: TControlFlowReplacerFactory;

    /**
     * @type {TControlFlowStorageFactory}
     */
    private readonly controlFlowStorageFactory: TControlFlowStorageFactory;

    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @param controlFlowStorageFactory
     * @param controlFlowReplacerFactory
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__TControlFlowStorage) controlFlowStorageFactory: TControlFlowStorageFactory,
        @inject(ServiceIdentifiers.Factory__IControlFlowReplacer) controlFlowReplacerFactory: TControlFlowReplacerFactory,
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.controlFlowStorageFactory = controlFlowStorageFactory;
        this.controlFlowReplacerFactory = controlFlowReplacerFactory;
        this.customNodeFactory = customNodeFactory;
    }

    /**
     * @param node
     * @return {boolean}
     */
    private static functionHasProhibitedStatements (node: ESTree.Node): boolean {
        const isBreakOrContinueStatement: boolean = Node.isBreakStatementNode(node) || Node.isContinueStatementNode(node);
        const isVariableDeclarationWithLetOrConstKind: boolean = Node.isVariableDeclarationNode(node) &&
            (node.kind === 'const' ||  node.kind === 'let');

        return Node.isFunctionDeclarationNode(node) || isBreakOrContinueStatement || isVariableDeclarationWithLetOrConstKind;
    }

    /**
     * @param functionNode
     * @returns {TNodeWithBlockStatement}
     */
    private static getHostNode (functionNode: ESTree.FunctionDeclaration | ESTree.FunctionExpression): TNodeWithBlockStatement {
        const blockScopesOfNode: TNodeWithBlockStatement[] = NodeUtils.getBlockScopesOfNode(functionNode);

        if (blockScopesOfNode.length === 1) {
            return functionNode.body;
        } else {
            blockScopesOfNode.pop();
        }

        if (blockScopesOfNode.length > FunctionControlFlowTransformer.hostNodeSearchMinDepth) {
            blockScopesOfNode.splice(0, FunctionControlFlowTransformer.hostNodeSearchMinDepth);
        }

        if (blockScopesOfNode.length > FunctionControlFlowTransformer.hostNodeSearchMaxDepth) {
            blockScopesOfNode.length = FunctionControlFlowTransformer.hostNodeSearchMaxDepth;
        }

        return RandomGeneratorUtils.getRandomGenerator().pickone(blockScopesOfNode);
    }

    /**
     * @param functionNode
     * @returns {ESTree.Node}
     */
    public transformNode (functionNode: ESTree.Function): ESTree.Node {
        if (Node.isArrowFunctionExpressionNode(functionNode)) {
            return functionNode;
        }

        const hostNode: TNodeWithBlockStatement = FunctionControlFlowTransformer.getHostNode(functionNode);
        const controlFlowStorage: IStorage<ICustomNode> = this.getControlFlowStorage(hostNode);

        let functionHasProhibitedStatements: boolean = false;

        this.controlFlowData.set(hostNode, controlFlowStorage);

        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (!functionHasProhibitedStatements) {
                    functionHasProhibitedStatements = FunctionControlFlowTransformer.functionHasProhibitedStatements(node);
                }

                return this.transformFunctionNodes(node, parentNode, controlFlowStorage);
            }
        });

        if (!functionHasProhibitedStatements) {
            this.transformFunctionStatements(functionNode);
        }

        if (!controlFlowStorage.getLength()) {
            return functionNode;
        }

        const controlFlowStorageCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageNode);

        controlFlowStorageCustomNode.initialize(controlFlowStorage);
        NodeAppender.prependNode(hostNode, controlFlowStorageCustomNode.getNode());
        this.hostNodesWithControlFlowNode.push(hostNode);

        return functionNode;
    }

    /**
     * @param hostNode
     * @return {IStorage<ICustomNode>}
     */
    private getControlFlowStorage (hostNode: TNodeWithBlockStatement): IStorage<ICustomNode> {
        const controlFlowStorage: IStorage <ICustomNode> = this.controlFlowStorageFactory();

        if (this.controlFlowData.has(hostNode)) {
            if (this.hostNodesWithControlFlowNode.indexOf(hostNode) !== -1) {
                hostNode.body.shift();
            }

            const hostControlFlowStorage: IStorage<ICustomNode> = <IStorage<ICustomNode>>this.controlFlowData.get(hostNode);

            controlFlowStorage.mergeWith(hostControlFlowStorage, true);
        }

        return controlFlowStorage;
    }

    /**
     * @param node
     * @param parentNode
     * @param controlFlowStorage
     * @return {ESTree.Node}
     */
    private transformFunctionNodes (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage<ICustomNode>
    ): ESTree.Node {
        if (!FunctionControlFlowTransformer.controlFlowReplacersMap.has(node.type)) {
            return node;
        }

        if (RandomGeneratorUtils.getRandomFloat(0, 1) > this.options.controlFlowFlatteningThreshold) {
            return node;
        }

        const controlFlowReplacerName: NodeControlFlowReplacers = <NodeControlFlowReplacers>FunctionControlFlowTransformer
            .controlFlowReplacersMap.get(node.type);

        return {
            ...this.controlFlowReplacerFactory(controlFlowReplacerName).replace(node, parentNode, controlFlowStorage),
            parentNode
        };
    }

    /**
     * @param functionNode
     */
    private transformFunctionStatements (functionNode: ESTree.FunctionExpression | ESTree.FunctionDeclaration): void {
        if (RandomGeneratorUtils.getRandomFloat(0, 1) > this.options.controlFlowFlatteningThreshold) {
            return;
        }

        const functionStatements: ESTree.Statement[] = functionNode.body.body;
        const functionStatementsObject: any = Object.assign({}, functionStatements);
        const originalKeys: number[] = Object.keys(functionStatementsObject).map((key: string) => parseInt(key, 10));
        const shuffledKeys: number[] = Utils.arrayShuffle(originalKeys);
        const originalKeysIndexesInShuffledArray: number[] = originalKeys.map((key: number) => shuffledKeys.indexOf(key));

        if (functionStatements.length <= 4) {
            return;
        } else if (!functionStatements.length) {
            functionStatements.push(
                Nodes.getReturnStatementNode(
                    Nodes.getLiteralNode(true)
                )
            );
        }

        const controllerIdentifierName: string = RandomGeneratorUtils.getRandomString(3);
        const indexIdentifierName: string = RandomGeneratorUtils.getRandomString(3);

        functionNode.body.body = [
            Nodes.getVariableDeclarationNode([
                Nodes.getVariableDeclaratorNode(
                    Nodes.getIdentifierNode(controllerIdentifierName),
                    Nodes.getCallExpressionNode(
                        Nodes.getMemberExpressionNode(
                            Nodes.getLiteralNode(
                                originalKeysIndexesInShuffledArray.join('|')
                            ),
                            Nodes.getIdentifierNode('split')
                        ),
                        [
                            Nodes.getLiteralNode('|')
                        ]
                    )
                ),
                Nodes.getVariableDeclaratorNode(
                    Nodes.getIdentifierNode(indexIdentifierName),
                    Nodes.getLiteralNode(0)
                )
            ]),
            Nodes.getWhileStatementNode(
                Nodes.getLiteralNode(true),
                Nodes.getBlockStatementNode([
                    Nodes.getSwitchStatementNode(
                        Nodes.getMemberExpressionNode(
                            Nodes.getIdentifierNode(controllerIdentifierName),
                            Nodes.getUpdateExpressionNode(
                                '++',
                                Nodes.getIdentifierNode(indexIdentifierName)
                            ),
                            true
                        ),
                        shuffledKeys.map((key: number, index: number) => {
                            return Nodes.getSwitchCaseNode(
                                Nodes.getLiteralNode(String(index)),
                                [
                                    functionStatementsObject[key],
                                    Nodes.getContinueStatement()
                                ]
                            );
                        })
                    ),
                    Nodes.getBreakStatement()
                ])
            )
        ];

        NodeUtils.parentize(functionNode.body);
    }
}
