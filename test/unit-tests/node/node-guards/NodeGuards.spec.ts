import * as ESTree from 'estree';

import { assert } from 'chai';

import { Nodes } from '../../../../src/node/Nodes';
import { NodeGuards } from '../../../../src/node/NodeGuards';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeGuards', () => {
    describe('isNodeHasBlockScope (node: ESTree.Node): node is TNodeWithBlockScope', () => {
        describe('truthful checks', () => {
            describe('variant #1: block statement of function declaration', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = Nodes.getBlockStatementNode();
                const parentNode: ESTree.FunctionDeclaration = Nodes.getFunctionDeclarationNode(
                    'foo',
                    [],
                    node
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isNodeHasBlockScope(node);
                });

                it('should check if node has block scope', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #2: block statement of function expression', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = Nodes.getBlockStatementNode();
                const parentNode: ESTree.FunctionExpression = Nodes.getFunctionExpressionNode(
                    [],
                    node
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isNodeHasBlockScope(node);
                });

                it('should check if node has block scope', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('false checks', () => {
            describe('variant #1: switch-case node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = Nodes.getSwitchCaseNode(
                    Nodes.getLiteralNode(1),
                    []
                );
                const parentNode: ESTree.FunctionDeclaration = Nodes.getFunctionDeclarationNode(
                    'foo',
                    [],
                    Nodes.getBlockStatementNode([
                        Nodes.getSwitchStatementNode(
                            Nodes.getMemberExpressionNode(
                                Nodes.getIdentifierNode('bar'),
                                Nodes.getUpdateExpressionNode(
                                    '++',
                                    Nodes.getIdentifierNode('baz')
                                ),
                                true
                            ),
                            [node]
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isNodeHasBlockScope(node);
                });

                it('should check if node has block scope', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #2: literal node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = Nodes.getLiteralNode(1);
                const parentNode: ESTree.FunctionDeclaration = Nodes.getFunctionDeclarationNode(
                    'foo',
                    [],
                    Nodes.getBlockStatementNode([
                        Nodes.getExpressionStatementNode(
                            Nodes.getCallExpressionNode(
                                Nodes.getIdentifierNode('bar'),
                                [node]
                            )
                        )
                    ])
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isNodeHasBlockScope(node);
                });

                it('should check if node has block scope', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #3: block statement of if statement', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = Nodes.getBlockStatementNode();
                const parentNode: ESTree.IfStatement = Nodes.getIfStatementNode(
                    Nodes.getIdentifierNode('foo'),
                    node
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isNodeHasBlockScope(node);
                });

                it('should check if node has block scope', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('exception checks', () => {
            describe('no `parentNode` property', () => {
                const node: ESTree.Node = Nodes.getBlockStatementNode();

                let testFunc: Function;

                before(() => {
                    testFunc = () => NodeGuards.isNodeHasBlockScope(node);
                });

                it('should check if node has block scope', () => {
                    assert.throw(testFunc, Error);
                });
            });
        });
    });

    describe('isNodeHasScope (node: ESTree.Node): node is TNodeWithScope', () => {
        describe('truthful checks', () => {
            describe('variant #1: program node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = Nodes.getProgramNode();

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeHasScope(node);
                });

                it('should check if node has scope', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #2: block statement node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = Nodes.getBlockStatementNode();

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeHasScope(node);
                });

                it('should check if node has scope', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #3: switch case node', () => {
                const expectedResult: boolean = true;
                const node: ESTree.Node = Nodes.getSwitchCaseNode(
                    Nodes.getLiteralNode(1),
                    []
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeHasScope(node);
                });

                it('should check if node has scope', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('false checks', () => {
            describe('variant #1: literal node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = Nodes.getLiteralNode(1);

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeHasScope(node);
                });

                it('should check if node has scope', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #2: identifier node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = Nodes.getIdentifierNode('foo');

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeHasScope(node);
                });

                it('should check if node has scope', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #3: if-statement node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = Nodes.getIfStatementNode(
                    Nodes.getIdentifierNode('foo'),
                    Nodes.getBlockStatementNode()
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeHasScope(node);
                });

                it('should check if node has scope', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #4: switch-statement node', () => {
                const expectedResult: boolean = false;
                const node: ESTree.Node = Nodes.getSwitchStatementNode(
                    Nodes.getIdentifierNode('foo'),
                    []
                );

                let result: boolean;

                before(() => {
                    result = NodeGuards.isNodeHasScope(node);
                });

                it('should check if node has scope', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });
    });

    describe('isReplaceableIdentifierNode (node: ESTree.Node, parentNode: ESTree.Node): node is ESTree.Identifier', () => {
        describe('truthful checks', () => {
            describe('variant #1: parent node is function declaration node', () => {
                const expectedResult: boolean = true;
                const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
                const parentNode: ESTree.Node = Nodes.getFunctionDeclarationNode(
                    'bar',
                    [identifier],
                    Nodes.getBlockStatementNode()
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isReplaceableIdentifierNode(identifier, parentNode);
                });

                it('should check if input identifier can be replaced by obfuscated one', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #2: parent node is computed property node', () => {
                const expectedResult: boolean = true;
                const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
                const parentNode: ESTree.Node = Nodes.getPropertyNode(
                    identifier,
                    Nodes.getLiteralNode('bar'),
                    true
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isReplaceableIdentifierNode(identifier, parentNode);
                });

                it('should check if input identifier can be replaced by obfuscated one', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #4: parent node is computed member expression node', () => {
                const expectedResult: boolean = true;
                const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
                const parentNode: ESTree.Node = Nodes.getMemberExpressionNode(
                    Nodes.getIdentifierNode('bar'),
                    identifier,
                    true
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isReplaceableIdentifierNode(identifier, parentNode);
                });

                it('should check if input identifier can be replaced by obfuscated one', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #4: parent node is computed method definition node', () => {
                const expectedResult: boolean = true;
                const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
                const parentNode: ESTree.Node = Nodes.getMethodDefinitionNode(
                    identifier,
                    Nodes.getFunctionExpressionNode([], Nodes.getBlockStatementNode()),
                    'method',
                    true
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isReplaceableIdentifierNode(identifier, parentNode);
                });

                it('should check if input identifier can be replaced by obfuscated one', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('false checks', () => {
            describe('variant #1: node isn\'t an identifier', () => {
                const expectedResult: boolean = false;
                const literal: ESTree.Literal = Nodes.getLiteralNode(1);
                const parentNode: ESTree.Node = Nodes.getExpressionStatementNode(
                    Nodes.getCallExpressionNode(
                        Nodes.getIdentifierNode('foo'),
                        [literal]
                    )
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isReplaceableIdentifierNode(literal, parentNode);
                });

                it('should check if input identifier can be replaced by obfuscated one', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #2: parent node isn\'t computed property node', () => {
                const expectedResult: boolean = false;
                const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
                const parentNode: ESTree.Node = Nodes.getPropertyNode(
                    identifier,
                    Nodes.getLiteralNode('bar'),
                    false
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isReplaceableIdentifierNode(identifier, parentNode);
                });

                it('should check if input identifier can be replaced by obfuscated one', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #3: parent node isn\'t computed member expression node', () => {
                const expectedResult: boolean = false;
                const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
                const parentNode: ESTree.Node = Nodes.getMemberExpressionNode(
                    Nodes.getIdentifierNode('bar'),
                    identifier,
                    false
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isReplaceableIdentifierNode(identifier, parentNode);
                });

                it('should check if input identifier can be replaced by obfuscated one', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('variant #4: parent node isn\'t computed method definition node', () => {
                const expectedResult: boolean = false;
                const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
                const parentNode: ESTree.Node = Nodes.getMethodDefinitionNode(
                    identifier,
                    Nodes.getFunctionExpressionNode([], Nodes.getBlockStatementNode()),
                    'method',
                    false
                );

                let result: boolean;

                before(() => {
                    NodeUtils.parentize(parentNode);
                    result = NodeGuards.isReplaceableIdentifierNode(identifier, parentNode);
                });

                it('should check if input identifier can be replaced by obfuscated one', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });
    });
});
