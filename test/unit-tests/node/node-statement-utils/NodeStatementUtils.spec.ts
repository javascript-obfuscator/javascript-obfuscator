import * as ESTree from 'estree';

import { assert } from 'chai';

import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeStatementUtils } from '../../../../src/node/NodeStatementUtils';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeStatementUtils', () => {
    describe('getParentNodeWithStatements', () => {
        let functionDeclarationBlockStatementNode: ESTree.BlockStatement,
            ifStatementBlockStatementNode1: ESTree.BlockStatement,
            ifStatementBlockStatementNode2: ESTree.BlockStatement,
            ifStatementNode1: ESTree.IfStatement,
            ifStatementNode2: ESTree.IfStatement,
            expressionStatementNode3: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            functionDeclarationNode: ESTree.FunctionDeclaration,
            programNode: ESTree.Program;

        before(() => {
            expressionStatementNode1 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
            expressionStatementNode2 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
            expressionStatementNode3 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

            ifStatementBlockStatementNode2 = NodeFactory.blockStatementNode([
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            ifStatementNode2 = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode2
            );

            ifStatementBlockStatementNode1 = NodeFactory.blockStatementNode([
                ifStatementNode2
            ]);

            ifStatementNode1 = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode1
            );

            functionDeclarationBlockStatementNode = NodeFactory.blockStatementNode([
                expressionStatementNode1,
                ifStatementNode1
            ]);

            functionDeclarationNode = NodeFactory.functionDeclarationNode('test', [], functionDeclarationBlockStatementNode);

            programNode = NodeFactory.programNode([
                functionDeclarationNode
            ]);

            programNode.parentNode = programNode;
            functionDeclarationNode.parentNode = programNode;
            functionDeclarationBlockStatementNode.parentNode = functionDeclarationNode;
            expressionStatementNode1.parentNode = functionDeclarationBlockStatementNode;
            ifStatementNode1.parentNode = functionDeclarationBlockStatementNode;
            ifStatementBlockStatementNode1.parentNode = ifStatementNode1;
            ifStatementNode2.parentNode = ifStatementBlockStatementNode1;
            ifStatementBlockStatementNode2.parentNode = ifStatementNode2;
            expressionStatementNode3.parentNode = ifStatementBlockStatementNode2;
        });

        it('should return parent node with statements for `program` node child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodeWithStatements(programNode), programNode);
        });

        it('should return parent node with statements node for `functionDeclaration` node child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodeWithStatements(functionDeclarationNode), programNode);
        });

        it('should return parent node with statements node for `functionDeclaration blockStatement` node child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodeWithStatements(functionDeclarationBlockStatementNode), programNode);
        });

        it('should return parent node with statements node for `expressionStatement` node #1 child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodeWithStatements(expressionStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `ifStatement` node child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodeWithStatements(ifStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `ifStatement blockStatement` node #1 child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodeWithStatements(ifStatementBlockStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `ifStatement blockStatement` node #2 child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodeWithStatements(ifStatementBlockStatementNode2), functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `expressionStatement` node #3 child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodeWithStatements(expressionStatementNode3), functionDeclarationBlockStatementNode);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeStatementUtils.getParentNodeWithStatements(expressionStatementNode2), ReferenceError);
        });
    });

    describe('getParentNodesWithStatements', () => {
        let functionDeclarationBlockStatementNode: ESTree.BlockStatement,
            ifStatementBlockStatementNode1: ESTree.BlockStatement,
            ifStatementBlockStatementNode2: ESTree.BlockStatement,
            ifStatementNode1: ESTree.IfStatement,
            ifStatementNode2: ESTree.IfStatement,
            expressionStatementNode3: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            functionDeclarationNode: ESTree.FunctionDeclaration,
            programNode: ESTree.Program;

        before(() => {
            expressionStatementNode1 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
            expressionStatementNode2 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
            expressionStatementNode3 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

            ifStatementBlockStatementNode2 = NodeFactory.blockStatementNode([
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            ifStatementNode2 = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode2
            );

            ifStatementBlockStatementNode1 = NodeFactory.blockStatementNode([
                ifStatementNode2
            ]);

            ifStatementNode1 = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode1
            );

            functionDeclarationBlockStatementNode = NodeFactory.blockStatementNode([
                expressionStatementNode1,
                ifStatementNode1
            ]);

            functionDeclarationNode = NodeFactory.functionDeclarationNode('test', [], functionDeclarationBlockStatementNode);

            programNode = NodeFactory.programNode([
                functionDeclarationNode
            ]);

            programNode.parentNode = programNode;
            functionDeclarationNode.parentNode = programNode;
            functionDeclarationBlockStatementNode.parentNode = functionDeclarationNode;
            expressionStatementNode1.parentNode = functionDeclarationBlockStatementNode;
            ifStatementNode1.parentNode = functionDeclarationBlockStatementNode;
            ifStatementBlockStatementNode1.parentNode = ifStatementNode1;
            ifStatementNode2.parentNode = ifStatementBlockStatementNode1;
            ifStatementBlockStatementNode2.parentNode = ifStatementNode2;
            expressionStatementNode3.parentNode = ifStatementBlockStatementNode2;
        });

        it('should return parent node with statements node for `program` node child node', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(programNode)[0], programNode);
        });

        it('should return parent node with statements node for `functionDeclaration` node child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(functionDeclarationNode)[0], programNode);
        });

        it('should return parent node with statements node for `functionDeclaration blockStatement` node child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(functionDeclarationBlockStatementNode)[0], programNode);
        });

        it('should return parent node with statements node for `expressionStatement` node #1 child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(expressionStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `expressionStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(expressionStatementNode1)[1], programNode);
        });

        it('should return parent node with statements node for `ifStatement` node child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(ifStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `ifStatement` node child node #2', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(ifStatementNode1)[1], programNode);
        });

        it('should return parent node with statements node for `ifStatement blockStatement` node #1 child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(ifStatementBlockStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `ifStatement blockStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(ifStatementBlockStatementNode1)[1], programNode);
        });

        it('should return parent node with statements node for `ifStatement blockStatement` node #2 child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(ifStatementBlockStatementNode2)[0], functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `ifStatement blockStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(ifStatementBlockStatementNode2)[1], programNode);
        });

        it('should return parent node with statements node for `expressionStatement` node #3 child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(expressionStatementNode3)[0], functionDeclarationBlockStatementNode);
        });

        it('should return parent node with statements node for `expressionStatement` node #3 child node #2', () => {
            assert.deepEqual(NodeStatementUtils.getParentNodesWithStatements(expressionStatementNode3)[1], programNode);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeStatementUtils.getParentNodesWithStatements(expressionStatementNode2)[0], ReferenceError);
        });
    });

    describe('getNextSiblingStatement', () => {
        describe('Variant #1: block statement node as scope node', () => {
                let statementNode1: ESTree.Statement,
                statementNode2: ESTree.Statement,
                statementNode3: ESTree.Statement;

            before(() => {
                statementNode1 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('a')
                );
                statementNode2 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('b')
                );
                statementNode3 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('c')
                );

                const blockStatementNode: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                    statementNode1,
                    statementNode2,
                    statementNode3
                ]);

                statementNode1.parentNode = blockStatementNode;
                statementNode2.parentNode = blockStatementNode;
                statementNode3.parentNode = blockStatementNode;
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeStatementUtils.getNextSiblingStatement(statementNode1), statementNode2);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeStatementUtils.getNextSiblingStatement(statementNode2), statementNode3);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeStatementUtils.getNextSiblingStatement(statementNode3), null);
            });
        });

        describe('Variant #2: switch case node as scope node', () => {
            let statementNode1: ESTree.Statement,
                statementNode2: ESTree.Statement,
                statementNode3: ESTree.Statement;

            before(() => {
                statementNode1 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('a')
                );
                statementNode2 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('b')
                );
                statementNode3 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('c')
                );

                const switchCaseNode: ESTree.SwitchCase = NodeFactory.switchCaseNode(
                    NodeFactory.literalNode(true),
                    [
                        statementNode1,
                        statementNode2,
                        statementNode3
                    ]
                );

                statementNode1.parentNode = switchCaseNode;
                statementNode2.parentNode = switchCaseNode;
                statementNode3.parentNode = switchCaseNode;
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeStatementUtils.getNextSiblingStatement(statementNode1), statementNode2);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeStatementUtils.getNextSiblingStatement(statementNode2), statementNode3);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeStatementUtils.getNextSiblingStatement(statementNode3), null);
            });
        });
    });

    describe('getPreviousSiblingStatement', () => {
        describe('Variant #1: block statement node as scope node', () => {
            let statementNode1: ESTree.Statement,
                statementNode2: ESTree.Statement,
                statementNode3: ESTree.Statement;

            before(() => {
                statementNode1 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('a')
                );
                statementNode2 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('b')
                );
                statementNode3 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('c')
                );

                const blockStatementNode: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                    statementNode1,
                    statementNode2,
                    statementNode3
                ]);

                statementNode1.parentNode = blockStatementNode;
                statementNode2.parentNode = blockStatementNode;
                statementNode3.parentNode = blockStatementNode;
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeStatementUtils.getPreviousSiblingStatement(statementNode1), null);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeStatementUtils.getPreviousSiblingStatement(statementNode2), statementNode1);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeStatementUtils.getPreviousSiblingStatement(statementNode3), statementNode2);
            });
        });

        describe('Variant #2: switch case node as scope node', () => {
            let statementNode1: ESTree.Statement,
                statementNode2: ESTree.Statement,
                statementNode3: ESTree.Statement;

            before(() => {
                statementNode1 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('a')
                );
                statementNode2 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('b')
                );
                statementNode3 = NodeFactory.expressionStatementNode(
                    NodeFactory.identifierNode('c')
                );

                const switchCaseNode: ESTree.SwitchCase = NodeFactory.switchCaseNode(
                    NodeFactory.literalNode(true),
                    [
                        statementNode1,
                        statementNode2,
                        statementNode3
                    ]
                );

                statementNode1.parentNode = switchCaseNode;
                statementNode2.parentNode = switchCaseNode;
                statementNode3.parentNode = switchCaseNode;
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeStatementUtils.getPreviousSiblingStatement(statementNode1), null);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeStatementUtils.getPreviousSiblingStatement(statementNode2), statementNode1);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeStatementUtils.getPreviousSiblingStatement(statementNode3), statementNode2);
            });
        });
    });

    describe('getRootStatementOfNode', () => {
        let assignmentExpression: ESTree.AssignmentExpression,
            expressionStatement: ESTree.ExpressionStatement,
            identifierNode1: ESTree.Identifier,
            identifierNode2: ESTree.Identifier,
            identifierNode3: ESTree.Identifier,
            identifierNode4: ESTree.Identifier,
            identifierNode5: ESTree.Identifier,
            functionDeclarationNode: ESTree.FunctionDeclaration,
            functionDeclarationBlockStatementNode: ESTree.BlockStatement,
            programNode: ESTree.Program,
            variableDeclarationNode: ESTree.VariableDeclaration;

        before(() => {
            identifierNode1 = NodeFactory.identifierNode('identifier');
            identifierNode2 = NodeFactory.identifierNode('identifier');
            identifierNode3 = NodeFactory.identifierNode('identifier');
            identifierNode4 = NodeFactory.identifierNode('foo');
            identifierNode5 = NodeFactory.identifierNode('bar');

            assignmentExpression = NodeFactory.assignmentExpressionNode(
                '=',
                identifierNode4,
                identifierNode5
            );

            expressionStatement = NodeFactory.expressionStatementNode(
                assignmentExpression
            );

            variableDeclarationNode = NodeFactory.variableDeclarationNode([
                NodeFactory.variableDeclaratorNode(
                    identifierNode1,
                    NodeFactory.binaryExpressionNode(
                        '+',
                        identifierNode2,
                        identifierNode3
                    )
                )
            ]);

            functionDeclarationBlockStatementNode = NodeFactory.blockStatementNode([
                variableDeclarationNode
            ]);

            functionDeclarationNode = NodeFactory.functionDeclarationNode('test', [], functionDeclarationBlockStatementNode);

            programNode = NodeFactory.programNode([
                functionDeclarationNode,
                NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    NodeFactory.blockStatementNode([
                        expressionStatement
                    ])
                )
            ]);

            NodeUtils.parentizeAst(programNode);

            identifierNode3.parentNode = undefined;
        });

        it('should return root statement in scope for `program` node child', () => {
            assert.throws(() => NodeStatementUtils.getRootStatementOfNode(programNode), Error);
        });

        it('should return root statement in scope for `functionDeclaration` node #1', () => {
            assert.deepEqual(NodeStatementUtils.getRootStatementOfNode(functionDeclarationNode), functionDeclarationNode);
        });

        it('should return root statement in scope for `functionDeclaration blockStatement` node #1', () => {
            assert.deepEqual(NodeStatementUtils.getRootStatementOfNode(functionDeclarationBlockStatementNode), functionDeclarationNode);
        });

        it('should return root statement in scope for `identifier` node #1', () => {
            assert.deepEqual(NodeStatementUtils.getRootStatementOfNode(identifierNode1), variableDeclarationNode);
        });

        it('should return root statement in scope for `identifier` node #2', () => {
            assert.deepEqual(NodeStatementUtils.getRootStatementOfNode(identifierNode2), variableDeclarationNode);
        });

        it('should return root statement in scope for `identifier` node #4', () => {
            assert.deepEqual(NodeStatementUtils.getRootStatementOfNode(identifierNode4), expressionStatement);
        });

        it('should return root statement in scope for `identifier` node #5', () => {
            assert.deepEqual(NodeStatementUtils.getRootStatementOfNode(identifierNode5), expressionStatement);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeStatementUtils.getRootStatementOfNode(identifierNode3), ReferenceError);
        });
    });

    describe('getScopeOfNode', () => {
        let functionDeclarationBlockStatementNode: ESTree.BlockStatement,
            ifStatementBlockStatementNode1: ESTree.BlockStatement,
            ifStatementBlockStatementNode2: ESTree.BlockStatement,
            ifStatementBlockStatementNode3: ESTree.BlockStatement,
            ifStatementNode1: ESTree.IfStatement,
            ifStatementNode2: ESTree.IfStatement,
            ifStatementNode3: ESTree.IfStatement,
            switchCaseNode: ESTree.SwitchCase,
            switchStatementNode: ESTree.SwitchStatement,
            expressionStatementNode3: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            functionDeclarationNode: ESTree.FunctionDeclaration,
            programNode: ESTree.Program;

        before(() => {
            expressionStatementNode1 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
            expressionStatementNode2 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
            expressionStatementNode3 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

            ifStatementBlockStatementNode3 = NodeFactory.blockStatementNode([
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            ifStatementNode3 = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode3
            );

            ifStatementBlockStatementNode2 = NodeFactory.blockStatementNode();

            ifStatementBlockStatementNode1 = NodeFactory.blockStatementNode([
                ifStatementNode3
            ]);

            ifStatementNode2 = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode2
            );

            ifStatementNode1 = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode1
            );

            switchCaseNode = NodeFactory.switchCaseNode(
                NodeFactory.literalNode(1),
                [
                    ifStatementNode2
                ]
            );

            switchStatementNode = NodeFactory.switchStatementNode(
                NodeFactory.literalNode(1),
                [
                    switchCaseNode
                ]
            );

            functionDeclarationBlockStatementNode = NodeFactory.blockStatementNode([
                expressionStatementNode1,
                ifStatementNode1,
                switchStatementNode
            ]);

            functionDeclarationNode = NodeFactory.functionDeclarationNode('test', [], functionDeclarationBlockStatementNode);

            programNode = NodeFactory.programNode([
                functionDeclarationNode
            ]);

            programNode.parentNode = programNode;
            functionDeclarationNode.parentNode = programNode;
            functionDeclarationBlockStatementNode.parentNode = functionDeclarationNode;
            expressionStatementNode1.parentNode = functionDeclarationBlockStatementNode;
            ifStatementNode1.parentNode = functionDeclarationBlockStatementNode;
            ifStatementBlockStatementNode1.parentNode = ifStatementNode1;
            switchStatementNode.parentNode = functionDeclarationBlockStatementNode;
            switchCaseNode.parentNode = switchStatementNode;
            ifStatementNode2.parentNode = switchCaseNode;
            ifStatementBlockStatementNode2.parentNode = ifStatementNode2;
            ifStatementNode3.parentNode = ifStatementBlockStatementNode1;
            ifStatementBlockStatementNode3.parentNode = ifStatementNode3;
            expressionStatementNode3.parentNode = ifStatementBlockStatementNode3;
        });

        it('should return scope node for `program` node child', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(programNode), programNode);
        });

        it('should return scope node for `functionDeclaration` node child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(functionDeclarationNode), programNode);
        });

        it('should return scope node for `functionDeclaration blockStatement` node child node #1', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(functionDeclarationBlockStatementNode), programNode);
        });

        it('should return scope node for `expressionStatement` node #1 child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(expressionStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `ifStatement` node #1 child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(ifStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `switchStatement` node child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(switchStatementNode), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `switchCase` node child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(switchCaseNode), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `ifStatement` node #2 child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(ifStatementNode2), switchCaseNode);
        });

        it('should return scope node for `ifStatement blockStatement` node #2 child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(ifStatementBlockStatementNode2), switchCaseNode);
        });

        it('should return scope node for `ifStatement blockStatement` node #1 child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(ifStatementBlockStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `ifStatement blockStatement` node #3 child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(ifStatementBlockStatementNode3), ifStatementBlockStatementNode1);
        });

        it('should return scope node for `expressionStatement` node #3 child node', () => {
            assert.deepEqual(NodeStatementUtils.getScopeOfNode(expressionStatementNode3), ifStatementBlockStatementNode3);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeStatementUtils.getScopeOfNode(expressionStatementNode2), ReferenceError);
        });
    });
});
