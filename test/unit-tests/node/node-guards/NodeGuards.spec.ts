import * as ESTree from 'estree';

import { assert } from 'chai';

import { NodeGuards } from '../../../../src/node/NodeGuards';
import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeGuards', () => {
    describe('isNodeWithLexicalScopeStatements', () => {
        describe('truthful checks', () => {
            describe('Variant #1: block statement of function declaration', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = NodeFactory.blockStatementNode();
                const parentNode: ESTree.FunctionDeclaration = NodeFactory.functionDeclarationNode(
                    'foo',
                    [],
                    node
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentizeAst(parentNode);
                    result = NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #2: block statement of function expression', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = NodeFactory.blockStatementNode();
                const parentNode: ESTree.FunctionExpression = NodeFactory.functionExpressionNode(
                    [],
                    node
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentizeAst(parentNode);
                    result = NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('false checks', () => {
            describe('Variant #1: switch-case node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = NodeFactory.switchCaseNode(
                    NodeFactory.literalNode(1),
                    []
                );
                const parentNode: ESTree.FunctionDeclaration = NodeFactory.functionDeclarationNode(
                    'foo',
                    [],
                    NodeFactory.blockStatementNode([
                        NodeFactory.switchStatementNode(
                            NodeFactory.memberExpressionNode(
                                NodeFactory.identifierNode('bar'),
                                NodeFactory.updateExpressionNode(
                                    '++',
                                    NodeFactory.identifierNode('baz')
                                ),
                                true
                            ),
                            [node]
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentizeAst(parentNode);
                    result = NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #2: literal node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = NodeFactory.literalNode(1);
                const parentNode: ESTree.FunctionDeclaration = NodeFactory.functionDeclarationNode(
                    'foo',
                    [],
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.callExpressionNode(
                                NodeFactory.identifierNode('bar'),
                                [node]
                            )
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentizeAst(parentNode);
                    result = NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #3: block statement of if statement', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = NodeFactory.blockStatementNode();
                const parentNode: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.identifierNode('foo'),
                    node
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentizeAst(parentNode);
                    result = NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });
    });

    describe('isNodeWithStatements', () => {
        describe('truthful checks', () => {
            describe('Variant #1: program node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = NodeFactory.programNode();

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithStatements(node);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #2: block statement node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = NodeFactory.blockStatementNode();

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithStatements(node);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #3: switch case node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = NodeFactory.switchCaseNode(
                    NodeFactory.literalNode(1),
                    []
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithStatements(node);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('false checks', () => {
            describe('Variant #1: literal node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = NodeFactory.literalNode(1);

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithStatements(node);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #2: identifier node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = NodeFactory.identifierNode('foo');

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithStatements(node);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #3: if-statement node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = NodeFactory.ifStatementNode(
                    NodeFactory.identifierNode('foo'),
                    NodeFactory.blockStatementNode()
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithStatements(node);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #4: switch-statement node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = NodeFactory.switchStatementNode(
                    NodeFactory.identifierNode('foo'),
                    []
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithStatements(node);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });
    });
});
