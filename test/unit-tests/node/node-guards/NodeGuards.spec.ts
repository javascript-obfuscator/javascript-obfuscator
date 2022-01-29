import * as ESTree from 'estree';

import { assert } from 'chai';

import { NodeGuards } from '../../../../src/node/NodeGuards';
import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeGuards', () => {
    describe('isIfStatementNodeWithSingleStatementBody', () => {
        describe('truthful checks', () => {
            describe('Variant #1: single statement `consequent`', () => {
                const expectedResult: boolean = true;
                const node: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    )
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isIfStatementNodeWithSingleStatementBody(node);
                });

                it('should check if `IfStatement` node has single statement `consequent`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #2: single statement `alternate`', () => {
                const expectedResult: boolean = true;
                const node: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ]),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    )
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isIfStatementNodeWithSingleStatementBody(node);
                });

                it('should check if `IfStatement` node has single statement `alternate`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #3: single statement `consequent` and `alternate`', () => {
                const expectedResult: boolean = true;
                const node: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    ),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    )
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isIfStatementNodeWithSingleStatementBody(node);
                });

                it('should check if `IfStatement` node has single statement `consequent` and `alternate`', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('false checks', () => {
            describe('Variant #1: other node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Literal = NodeFactory.literalNode(true);

                let result: boolean;

                before(() => {
                    result = NodeGuards.isIfStatementNodeWithSingleStatementBody(node);
                });

                it('should return `false` for other node', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #2: multiple statements `consequent` and `alternate`', () => {
                const expectedResult: boolean = false;
                const node: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ]),
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isIfStatementNodeWithSingleStatementBody(node);
                });

                it('should check if `IfStatement` node has multiple statements `consequent` and `alternate`', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });
    });

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

    describe('isNodeWithSingleStatementBody', () => {
        describe('truthful checks', () => {
            describe('Variant #1: `IfStatement` node', () => {
                describe('Variant #1: single statement `consequent`', () => {
                    const expectedResult: boolean = true;
                    const node: ESTree.IfStatement = NodeFactory.ifStatementNode(
                        NodeFactory.literalNode(true),
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    );

                    let result: boolean;

                    before(() => {
                        result = NodeGuards.isNodeWithSingleStatementBody(node);
                    });

                    it('should check if `IfStatement` node has single statement `consequent`', () => {
                        assert.equal(result, expectedResult);
                    });
                });

                describe('Variant #2: single statement `alternate`', () => {
                    const expectedResult: boolean = true;
                    const node: ESTree.IfStatement = NodeFactory.ifStatementNode(
                        NodeFactory.literalNode(true),
                        NodeFactory.blockStatementNode([
                            NodeFactory.expressionStatementNode(
                                NodeFactory.literalNode(true)
                            )
                        ]),
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    );

                    let result: boolean;

                    before(() => {
                        result = NodeGuards.isNodeWithSingleStatementBody(node);
                    });

                    it('should check if `IfStatement` node has single statement `alternate`', () => {
                        assert.equal(result, expectedResult);
                    });
                });

                describe('Variant #3: single statement `consequent` and `alternate`', () => {
                    const expectedResult: boolean = true;
                    const node: ESTree.IfStatement = NodeFactory.ifStatementNode(
                        NodeFactory.literalNode(true),
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        ),
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    );

                    let result: boolean;

                    before(() => {
                        result = NodeGuards.isNodeWithSingleStatementBody(node);
                    });

                    it('should check if `IfStatement` node has single statement `consequent` and `alternate`', () => {
                        assert.equal(result, expectedResult);
                    });
                });
            });

            describe('Variant #2: `ForStatement` node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.ForStatement = NodeFactory.forStatementNode(
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('i'),
                            NodeFactory.literalNode(0)
                        )
                    ]),
                    NodeFactory.binaryExpressionNode(
                        '<',
                        NodeFactory.identifierNode('i'),
                        NodeFactory.literalNode(10)
                    ),
                    NodeFactory.updateExpressionNode(
                        '++',
                        NodeFactory.identifierNode('i')
                    ),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    )
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `ForStatement` node has single statement `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #3: `ForInStatement` node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.ForInStatement = NodeFactory.forInStatementNode(
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('key'),
                            null
                        )
                    ]),
                    NodeFactory.objectExpressionNode(
                        []
                    ),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    )
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `ForInStatement` node has single statement `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #4: `ForOfStatement` node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.ForOfStatement = NodeFactory.forOfStatementNode(
                    false,
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('key'),
                            null
                        )
                    ]),
                    NodeFactory.objectExpressionNode(
                        []
                    ),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    )
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `ForOfStatement` node has single statement `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #5: `WhileStatement` node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.WhileStatement = NodeFactory.whileStatementNode(
                    NodeFactory.literalNode(true),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    )
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `WhileStatement` node has single statement `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #6: `DoWhileStatement` node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.DoWhileStatement = NodeFactory.doWhileStatementNode(
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    ),
                    NodeFactory.literalNode(true)
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `DoWhileStatement` node has single statement `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #7: `LabeledStatement` node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.LabeledStatement = NodeFactory.labeledStatementNode(
                    NodeFactory.identifierNode('label'),
                    NodeFactory.expressionStatementNode(
                        NodeFactory.literalNode(true)
                    )
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `LabeledStatement` node has single statement `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('false checks', () => {
            describe('Variant #1: `IfStatement` node', () => {
                describe('Variant #1: multiple statements `consequent` and `alternate`', () => {
                    const expectedResult: boolean = false;
                    const node: ESTree.IfStatement = NodeFactory.ifStatementNode(
                        NodeFactory.literalNode(true),
                        NodeFactory.blockStatementNode([
                            NodeFactory.expressionStatementNode(
                                NodeFactory.literalNode(true)
                            )
                        ]),
                        NodeFactory.blockStatementNode([
                            NodeFactory.expressionStatementNode(
                                NodeFactory.literalNode(true)
                            )
                        ])
                    );

                    let result: boolean;

                    before(() => {
                        result = NodeGuards.isNodeWithSingleStatementBody(node);
                    });

                    it('should check if `IfStatement` node has multiple statements `consequent` and `alternate`', () => {
                        assert.equal(result, expectedResult);
                    });
                });
            });

            describe('Variant #2: `ForStatement` node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.ForStatement = NodeFactory.forStatementNode(
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('i'),
                            NodeFactory.literalNode(0)
                        )
                    ]),
                    NodeFactory.binaryExpressionNode(
                        '<',
                        NodeFactory.identifierNode('i'),
                        NodeFactory.literalNode(10)
                    ),
                    NodeFactory.updateExpressionNode(
                        '++',
                        NodeFactory.identifierNode('i')
                    ),
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `ForStatement` node has multiple statements `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #3: `ForInStatement` node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.ForInStatement = NodeFactory.forInStatementNode(
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('key'),
                            null
                        )
                    ]),
                    NodeFactory.objectExpressionNode(
                        []
                    ),
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `ForInStatement` node has multiple statements `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #4: `ForOfStatement` node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.ForOfStatement = NodeFactory.forOfStatementNode(
                    false,
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('key'),
                            null
                        )
                    ]),
                    NodeFactory.objectExpressionNode(
                        []
                    ),
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `ForOfStatement` node has multiple statements `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #5: `WhileStatement` node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.WhileStatement = NodeFactory.whileStatementNode(
                    NodeFactory.literalNode(true),
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `WhileStatement` node has multiple statements `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #6: `DoWhileStatement` node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.DoWhileStatement = NodeFactory.doWhileStatementNode(
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ]),
                    NodeFactory.literalNode(true)
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `DoWhileStatement` node has multiple statements `body`', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #7: `LabeledStatement` node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.LabeledStatement = NodeFactory.labeledStatementNode(
                    NodeFactory.identifierNode('label'),
                    NodeFactory.blockStatementNode([
                        NodeFactory.expressionStatementNode(
                            NodeFactory.literalNode(true)
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithSingleStatementBody(node);
                });

                it('should check if `LabeledStatement` node has multiple statements `body`', () => {
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

            describe('Variant #3: static block node', () => {
                const expectedResult: boolean = true;
                // TODO: remove typecast after @types/estree update
                const node: ESTree.Node = <any>NodeFactory.staticBlockNode();

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeWithStatements(node);
                });

                it('should check if node has statements', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #4: switch case node', () => {
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
