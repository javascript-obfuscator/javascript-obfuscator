import * as ESTree from 'estree';

import { assert } from 'chai';

import { TStatement } from '../../../../src/types/node/TStatement';

import { removeRangesFromStructure } from '../../../helpers/removeRangesFromStructure';

import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyTo', () => {
        let literalNode: ESTree.Literal,
            expectedLiteralNode: ESTree.Literal;

        before(() => {
            literalNode = NodeFactory.literalNode('value');
            delete literalNode['x-verbatim-property'];

            expectedLiteralNode = NodeFactory.literalNode('value');

            NodeUtils.addXVerbatimPropertyTo(literalNode);
        });

        it('should add `x-verbatim-property` to `Literal` node', () => {
            assert.deepEqual(literalNode, expectedLiteralNode);
        });
    });

    describe('clone', () => {
        describe('Variant #1: simple AST-tree', () => {
            let programNode: ESTree.Program,
                expectedProgramNode: ESTree.Program;

            before(() => {
                // actual AST tree
                const expressionStatementNode1: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
                const expressionStatementNode2: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

                const ifStatementBlockStatementNode1: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                    expressionStatementNode1,
                    expressionStatementNode2
                ]);

                const ifStatementNode1: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    ifStatementBlockStatementNode1
                );

                // expected AST tree
                const expressionStatementNode3: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
                const expressionStatementNode4: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

                const ifStatementBlockStatementNode2: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                    expressionStatementNode3,
                    expressionStatementNode4
                ]);

                const ifStatementNode2: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    ifStatementBlockStatementNode2
                );

                programNode = NodeUtils.clone(
                    NodeFactory.programNode([
                        ifStatementNode1
                    ])
                );
                expectedProgramNode = NodeUtils.parentizeAst(
                    NodeFactory.programNode([
                        ifStatementNode2
                    ])
                );
            });

            it('should clone given AST-tree', () => {
                assert.deepEqual(programNode, expectedProgramNode);
            });
        });

        describe('Variant #2: array expression with `null` element', () => {
            let programNode: ESTree.Program,
                expectedProgramNode: ESTree.Program;

            before(() => {
                // actual AST tree
                const arrayExpressionNode: ESTree.ArrayExpression = NodeFactory.arrayExpressionNode([
                    NodeFactory.literalNode(1),
                    NodeFactory.literalNode(2),
                    <any>null,
                    NodeFactory.literalNode(4)
                ]);
                const expressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(
                    arrayExpressionNode
                );

                // expected AST tree
                const expectedArrayExpressionNode: ESTree.ArrayExpression = NodeFactory.arrayExpressionNode([
                    NodeFactory.literalNode(1),
                    NodeFactory.literalNode(2),
                    <any>null,
                    NodeFactory.literalNode(4)
                ]);
                const expectedExpressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(
                    expectedArrayExpressionNode
                );

                programNode = NodeUtils.clone(
                    NodeFactory.programNode([
                        expressionStatementNode
                    ])
                );
                expectedProgramNode = NodeUtils.parentizeAst(
                    NodeFactory.programNode([
                        expectedExpressionStatementNode
                    ])
                );
            });

            it('should clone given AST-tree', () => {
                assert.deepEqual(programNode, expectedProgramNode);
            });
        });
    });

    describe('convertCodeToStructure', () => {
        let structure: TStatement[],
            expectedStructure: TStatement[];

        before(() => {
            const code: string = `
                var abc = 'cde';
            `;

            const identifierNode: ESTree.Identifier = NodeFactory.identifierNode('abc');
            const literalNode: ESTree.Literal = NodeFactory.literalNode('cde');
            const variableDeclaratorNode: ESTree.VariableDeclarator = NodeFactory
                .variableDeclaratorNode(identifierNode, literalNode);
            const variableDeclarationNode: ESTree.VariableDeclaration = NodeFactory
                .variableDeclarationNode([variableDeclaratorNode]);
            const programNode: ESTree.Program = NodeFactory.programNode([variableDeclarationNode]);

            programNode.parentNode = programNode;
            variableDeclarationNode.parentNode = programNode;
            variableDeclaratorNode.parentNode = variableDeclarationNode;
            identifierNode.parentNode = variableDeclaratorNode;
            literalNode.parentNode = variableDeclaratorNode;

            structure = removeRangesFromStructure(
                NodeUtils.convertCodeToStructure(code)
            );
            expectedStructure = [variableDeclarationNode];
        });

        it('should convert code to `ESTree.Node[]` structure array', () => {
            assert.deepEqual(structure, expectedStructure);
        });
    });

    describe('convertStructureToCode', () => {
        let structure: ESTree.Node[],
            expectedCode: string;

        before(() => {
            structure = [
                NodeFactory.programNode([
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('abc'),
                            NodeFactory.literalNode('cde')
                        )
                    ])
                ])
            ];
            expectedCode = 'var abc = \'cde\';';
        });

        it('should convert `ESTree.Node[]` structure to source code', () => {
            assert.deepEqual(NodeUtils.convertStructureToCode(structure), expectedCode);
        });
    });

    describe('getBlockScopesOfNode', () => {
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

        it('should return block-scope node for `program` node child', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(programNode)[0], programNode);
        });

        it('should return block-scope node for `functionDeclaration` node child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(functionDeclarationNode)[0], programNode);
        });

        it('should return block-scope node for `functionDeclaration blockStatement` node child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(functionDeclarationBlockStatementNode)[0], programNode);
        });

        it('should return block-scope node for `expressionStatement` node #1 child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `expressionStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode1)[1], programNode);
        });

        it('should return block-scope node for `ifStatement` node child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `ifStatement` node child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementNode1)[1], programNode);
        });

        it('should return block-scope node for `ifStatement blockStatement` node #1 child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `ifStatement blockStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode1)[1], programNode);
        });

        it('should return block-scope node for `ifStatement blockStatement` node #2 child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode2)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `ifStatement blockStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode2)[1], programNode);
        });

        it('should return block-scope node for `expressionStatement` node #3 child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode3)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `expressionStatement` node #3 child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode3)[1], programNode);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeUtils.getBlockScopesOfNode(expressionStatementNode2)[0], ReferenceError);
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
                assert.deepEqual(NodeUtils.getNextSiblingStatement(statementNode1), statementNode2);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatement(statementNode2), statementNode3);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatement(statementNode3), null);
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
                assert.deepEqual(NodeUtils.getNextSiblingStatement(statementNode1), statementNode2);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatement(statementNode2), statementNode3);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatement(statementNode3), null);
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
                assert.deepEqual(NodeUtils.getPreviousSiblingStatement(statementNode1), null);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatement(statementNode2), statementNode1);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatement(statementNode3), statementNode2);
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
                assert.deepEqual(NodeUtils.getPreviousSiblingStatement(statementNode1), null);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatement(statementNode2), statementNode1);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatement(statementNode3), statementNode2);
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
            assert.throws(() => NodeUtils.getRootStatementOfNode(programNode), Error);
        });

        it('should return root statement in scope for `functionDeclaration` node #1', () => {
            assert.deepEqual(NodeUtils.getRootStatementOfNode(functionDeclarationNode), functionDeclarationNode);
        });

        it('should return root statement in scope for `functionDeclaration blockStatement` node #1', () => {
            assert.deepEqual(NodeUtils.getRootStatementOfNode(functionDeclarationBlockStatementNode), functionDeclarationNode);
        });

        it('should return root statement in scope for `identifier` node #1', () => {
            assert.deepEqual(NodeUtils.getRootStatementOfNode(identifierNode1), variableDeclarationNode);
        });

        it('should return root statement in scope for `identifier` node #2', () => {
            assert.deepEqual(NodeUtils.getRootStatementOfNode(identifierNode2), variableDeclarationNode);
        });

        it('should return root statement in scope for `identifier` node #4', () => {
            assert.deepEqual(NodeUtils.getRootStatementOfNode(identifierNode4), expressionStatement);
        });

        it('should return root statement in scope for `identifier` node #5', () => {
            assert.deepEqual(NodeUtils.getRootStatementOfNode(identifierNode5), expressionStatement);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeUtils.getRootStatementOfNode(identifierNode3), ReferenceError);
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
            assert.deepEqual(NodeUtils.getScopeOfNode(programNode), programNode);
        });

        it('should return scope node for `functionDeclaration` node child node #1', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(functionDeclarationNode), programNode);
        });

        it('should return scope node for `functionDeclaration blockStatement` node child node #1', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(functionDeclarationBlockStatementNode), programNode);
        });

        it('should return scope node for `expressionStatement` node #1 child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(expressionStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `ifStatement` node #1 child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(ifStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `switchStatement` node child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(switchStatementNode), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `switchCase` node child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(switchCaseNode), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `ifStatement` node #2 child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(ifStatementNode2), switchCaseNode);
        });

        it('should return scope node for `ifStatement blockStatement` node #2 child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(ifStatementBlockStatementNode2), switchCaseNode);
        });

        it('should return scope node for `ifStatement blockStatement` node #1 child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(ifStatementBlockStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should return scope node for `ifStatement blockStatement` node #3 child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(ifStatementBlockStatementNode3), ifStatementBlockStatementNode1);
        });

        it('should return scope node for `expressionStatement` node #3 child node', () => {
            assert.deepEqual(NodeUtils.getScopeOfNode(expressionStatementNode3), ifStatementBlockStatementNode3);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeUtils.getScopeOfNode(expressionStatementNode2), ReferenceError);
        });
    });

    describe('getUnaryExpressionArgumentNode', () => {
        let expectedNode: ESTree.Literal,
            unaryExpressionArgumentNode: ESTree.Node;

        before(() => {
            const literalNode: ESTree.Literal = NodeFactory.literalNode('test');
            const unaryExpressionNode2: ESTree.UnaryExpression = NodeFactory.unaryExpressionNode('!', literalNode);
            const unaryExpressionNode1: ESTree.UnaryExpression = NodeFactory.unaryExpressionNode('!', unaryExpressionNode2);
            const expressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(unaryExpressionNode1);
            const programNode: ESTree.Program = NodeFactory.programNode([
                expressionStatementNode
            ]);

            programNode.parentNode = programNode;
            expressionStatementNode.parentNode = programNode;
            unaryExpressionNode1.parentNode = expressionStatementNode;
            unaryExpressionNode2.parentNode = unaryExpressionNode1;
            literalNode.parentNode = unaryExpressionNode2;

            unaryExpressionArgumentNode = NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode1);
            expectedNode = literalNode;
        });

        it('should return unary expression argument node', () => {
            assert.deepEqual(unaryExpressionArgumentNode, expectedNode);
        });
    });

    describe('parentizeAst', () => {
        let ifStatementNode: ESTree.IfStatement,
            ifStatementBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            programNode: ESTree.Program;

        beforeEach(() => {
            expressionStatementNode1 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
            expressionStatementNode2 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

            ifStatementBlockStatementNode = NodeFactory.blockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);

            ifStatementNode = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode
            );
        });

        describe('Variant #1: parentize AST-tree with `ProgramNode` as root node', () => {
            beforeEach(() => {
                programNode = NodeFactory.programNode([
                    ifStatementNode
                ]);

                programNode = NodeUtils.parentizeAst(programNode);
            });

            it('should parentize `program` node with `ProgramNode` as root node', () => {
                assert.deepEqual(programNode.parentNode, programNode);
            });

            it('should parentize `ifStatement` node with `ProgramNode` as root node', () => {
                assert.deepEqual(ifStatementNode.parentNode, programNode);
            });

            it('should parentize `ifStatement blockStatement` node with `ProgramNode` as root node', () => {
                assert.deepEqual(ifStatementBlockStatementNode.parentNode, ifStatementNode);
            });

            it('should parentize `expressionStatement` node #1 with `ProgramNode` as root node', () => {
                assert.deepEqual(expressionStatementNode1.parentNode, ifStatementBlockStatementNode);
            });

            it('should parentize `expressionStatement` node #2 with `ProgramNode` as root node', () => {
                assert.deepEqual(expressionStatementNode2.parentNode, ifStatementBlockStatementNode);
            });
        });

        describe('Variant #2: parentize AST-tree', () => {
            beforeEach(() => {
                ifStatementNode = NodeUtils.parentizeAst(ifStatementNode);
            });

            it('should parentize `ifStatement` node', () => {
                assert.deepEqual(ifStatementNode.parentNode, ifStatementNode);
            });

            it('should parentize `ifStatement blockStatement` node', () => {
                assert.deepEqual(ifStatementBlockStatementNode.parentNode, ifStatementNode);
            });

            it('should parentize `expressionStatement` node #1', () => {
                assert.deepEqual(expressionStatementNode1.parentNode, ifStatementBlockStatementNode);
            });

            it('should parentize `expressionStatement` node #2', () => {
                assert.deepEqual(expressionStatementNode2.parentNode, ifStatementBlockStatementNode);
            });
        });
    });

    describe('parentizeNode', () => {
        describe('Variant #1: node with parent node', () => {
            const identifier: ESTree.Identifier = NodeFactory.identifierNode('foo');
            const breakStatement: ESTree.BreakStatement = NodeFactory.breakStatement(identifier);

            const expectedResult: ESTree.Identifier = NodeUtils.clone(identifier);

            let result: ESTree.Identifier;

            before(() => {
                expectedResult.parentNode = breakStatement;

                result = NodeUtils.parentizeNode(identifier, breakStatement);
            });

            it('should parentize given node', () => {
                assert.deepEqual(result, expectedResult);
            });
        });

        describe('Variant #2: node without parent node', () => {
            const identifier: ESTree.Identifier = NodeFactory.identifierNode('Foo');
            const expectedResult: ESTree.Identifier = NodeUtils.clone(identifier);

            let result: ESTree.Identifier;

            before(() => {
                expectedResult.parentNode = expectedResult;

                result = NodeUtils.parentizeNode(identifier, <any>null);
            });

            it('should parentize given node', () => {
                assert.deepEqual(result, expectedResult);
            });
        });
    });
});
