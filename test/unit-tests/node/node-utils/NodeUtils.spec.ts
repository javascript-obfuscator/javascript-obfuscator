import * as ESTree from 'estree';

import { assert } from 'chai';

import { TStatement } from '../../../../src/types/node/TStatement';

import { Nodes } from '../../../../src/node/Nodes';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyToLiterals (node: ESTree.Node): void', () => {
        let literalNode: ESTree.Literal,
            expectedLiteralNode: ESTree.Literal;

        before(() => {
            literalNode = Nodes.getLiteralNode('value');
            delete literalNode['x-verbatim-property'];

            expectedLiteralNode = Nodes.getLiteralNode('value');

            NodeUtils.addXVerbatimPropertyToLiterals(literalNode);
        });

        it('should add `x-verbatim-property` to `Literal` node', () => {
            assert.deepEqual(literalNode, expectedLiteralNode);
        });
    });

    describe('clone <T extends ESTree.Node> (astTree: T): T', () => {
        describe('Variant #1: simple AST-tree', () => {
            let programNode: ESTree.Program,
                expectedProgramNode: ESTree.Program;

            before(() => {
                // actual AST tree
                const expressionStatementNode1: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
                const expressionStatementNode2: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

                const ifStatementBlockStatementNode1: ESTree.BlockStatement = Nodes.getBlockStatementNode([
                    expressionStatementNode1,
                    expressionStatementNode2
                ]);

                const ifStatementNode1: ESTree.IfStatement = Nodes.getIfStatementNode(
                    Nodes.getLiteralNode(true),
                    ifStatementBlockStatementNode1
                );

                // expected AST tree
                const expressionStatementNode3: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
                const expressionStatementNode4: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

                const ifStatementBlockStatementNode2: ESTree.BlockStatement = Nodes.getBlockStatementNode([
                    expressionStatementNode3,
                    expressionStatementNode4
                ]);

                const ifStatementNode2: ESTree.IfStatement = Nodes.getIfStatementNode(
                    Nodes.getLiteralNode(true),
                    ifStatementBlockStatementNode2
                );

                programNode = NodeUtils.clone(
                    Nodes.getProgramNode([
                        ifStatementNode1
                    ])
                );
                expectedProgramNode = NodeUtils.parentize(
                    Nodes.getProgramNode([
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
                const arrayExpressionNode: ESTree.ArrayExpression = Nodes.getArrayExpressionNode([
                    Nodes.getLiteralNode(1),
                    Nodes.getLiteralNode(2),
                    <any>null,
                    Nodes.getLiteralNode(4)
                ]);
                const expressionStatementNode: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(
                    arrayExpressionNode
                );

                // expected AST tree
                const expectedArrayExpressionNode: ESTree.ArrayExpression = Nodes.getArrayExpressionNode([
                    Nodes.getLiteralNode(1),
                    Nodes.getLiteralNode(2),
                    <any>null,
                    Nodes.getLiteralNode(4)
                ]);
                const expectedExpressionStatementNode: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(
                    expectedArrayExpressionNode
                );

                programNode = NodeUtils.clone(
                    Nodes.getProgramNode([
                        expressionStatementNode
                    ])
                );
                expectedProgramNode = NodeUtils.parentize(
                    Nodes.getProgramNode([
                        expectedExpressionStatementNode
                    ])
                );
            });

            it('should clone given AST-tree', () => {
                assert.deepEqual(programNode, expectedProgramNode);
            });
        });
    });

    describe('convertCodeToStructure (code: string): ESTree.Node[]', () => {
        let structure: TStatement[],
            expectedStructure: TStatement[];

        before(() => {
            const code: string = `
                var abc = 'cde';
            `;

            const identifierNode: ESTree.Identifier = Nodes.getIdentifierNode('abc');
            const literalNode: ESTree.Literal = Nodes.getLiteralNode('cde');
            const variableDeclaratorNode: ESTree.VariableDeclarator = Nodes.getVariableDeclaratorNode(identifierNode, literalNode);
            const variableDeclarationNode: ESTree.VariableDeclaration = Nodes.getVariableDeclarationNode([
                variableDeclaratorNode
            ]);
            const programNode: ESTree.Program = Nodes.getProgramNode([
                variableDeclarationNode
            ]);

            programNode.parentNode = programNode;
            variableDeclarationNode.parentNode = programNode;
            variableDeclaratorNode.parentNode = variableDeclarationNode;
            identifierNode.parentNode = variableDeclaratorNode;
            literalNode.parentNode = variableDeclaratorNode;

            structure = NodeUtils.convertCodeToStructure(code);
            expectedStructure = [variableDeclarationNode];
        });

        it('should convert code to `ESTree.Node[]` structure array', () => {
            assert.deepEqual(structure, expectedStructure);
        });
    });

    describe('convertStructureToCode (structure: ESTree.Node[]): string', () => {
        let structure: ESTree.Node[],
            expectedCode: string;

        before(() => {
            structure = [
                Nodes.getProgramNode([
                    Nodes.getVariableDeclarationNode([
                        Nodes.getVariableDeclaratorNode(
                            Nodes.getIdentifierNode('abc'),
                            Nodes.getLiteralNode('cde')
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

    describe('getBlockScopesOfNode (node: ESTree.Node, blockScopes: TNodeWithBlockScope[] = []): TNodeWithBlockScope[]', () => {
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
            expressionStatementNode1 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode2 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode3 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            ifStatementBlockStatementNode2 = Nodes.getBlockStatementNode([
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            ifStatementNode2 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode2
            );

            ifStatementBlockStatementNode1 = Nodes.getBlockStatementNode([
                ifStatementNode2
            ]);

            ifStatementNode1 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode1
            );

            functionDeclarationBlockStatementNode = Nodes.getBlockStatementNode([
                expressionStatementNode1,
                ifStatementNode1
            ]);

            functionDeclarationNode = Nodes.getFunctionDeclarationNode('test', [], functionDeclarationBlockStatementNode);

            programNode = Nodes.getProgramNode([
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

    describe('getNextSiblingStatementNode (node: ESTree.Statement): TStatement | null', () => {
        describe('Variant #1: block statement node as scope node', () => {
                let statementNode1: ESTree.Statement,
                statementNode2: ESTree.Statement,
                statementNode3: ESTree.Statement;

            before(() => {
                statementNode1 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('a')
                );
                statementNode2 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('b')
                );
                statementNode3 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('c')
                );

                const blockStatementNode: ESTree.BlockStatement = Nodes.getBlockStatementNode([
                    statementNode1,
                    statementNode2,
                    statementNode3
                ]);

                statementNode1.parentNode = blockStatementNode;
                statementNode2.parentNode = blockStatementNode;
                statementNode3.parentNode = blockStatementNode;
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatementNode(statementNode1), statementNode2);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatementNode(statementNode2), statementNode3);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatementNode(statementNode3), null);
            });
        });

        describe('Variant #2: switch case node as scope node', () => {
            let statementNode1: ESTree.Statement,
                statementNode2: ESTree.Statement,
                statementNode3: ESTree.Statement;

            before(() => {
                statementNode1 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('a')
                );
                statementNode2 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('b')
                );
                statementNode3 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('c')
                );

                const switchCaseNode: ESTree.SwitchCase = Nodes.getSwitchCaseNode(
                    Nodes.getLiteralNode(true),
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
                assert.deepEqual(NodeUtils.getNextSiblingStatementNode(statementNode1), statementNode2);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatementNode(statementNode2), statementNode3);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeUtils.getNextSiblingStatementNode(statementNode3), null);
            });
        });
    });

    describe('getPreviousSiblingStatementNode (node: ESTree.Statement): TStatement | null', () => {
        describe('Variant #1: block statement node as scope node', () => {
            let statementNode1: ESTree.Statement,
                statementNode2: ESTree.Statement,
                statementNode3: ESTree.Statement;

            before(() => {
                statementNode1 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('a')
                );
                statementNode2 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('b')
                );
                statementNode3 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('c')
                );

                const blockStatementNode: ESTree.BlockStatement = Nodes.getBlockStatementNode([
                    statementNode1,
                    statementNode2,
                    statementNode3
                ]);

                statementNode1.parentNode = blockStatementNode;
                statementNode2.parentNode = blockStatementNode;
                statementNode3.parentNode = blockStatementNode;
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatementNode(statementNode1), null);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatementNode(statementNode2), statementNode1);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatementNode(statementNode3), statementNode2);
            });
        });

        describe('Variant #2: switch case node as scope node', () => {
            let statementNode1: ESTree.Statement,
                statementNode2: ESTree.Statement,
                statementNode3: ESTree.Statement;

            before(() => {
                statementNode1 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('a')
                );
                statementNode2 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('b')
                );
                statementNode3 = Nodes.getExpressionStatementNode(
                    Nodes.getIdentifierNode('c')
                );

                const switchCaseNode: ESTree.SwitchCase = Nodes.getSwitchCaseNode(
                    Nodes.getLiteralNode(true),
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
                assert.deepEqual(NodeUtils.getPreviousSiblingStatementNode(statementNode1), null);
            });

            it('should return next sibling statement node', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatementNode(statementNode2), statementNode1);
            });

            it('should return `null` if given statement node is last node in the scope', () => {
                assert.deepEqual(NodeUtils.getPreviousSiblingStatementNode(statementNode3), statementNode2);
            });
        });
    });

    describe('getScopeOfNode (node: ESTree.Node): TNodeWithScope | null', () => {
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
            expressionStatementNode1 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode2 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode3 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            ifStatementBlockStatementNode3 = Nodes.getBlockStatementNode([
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            ifStatementNode3 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode3
            );

            ifStatementBlockStatementNode2 = Nodes.getBlockStatementNode();

            ifStatementBlockStatementNode1 = Nodes.getBlockStatementNode([
                ifStatementNode3
            ]);

            ifStatementNode2 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode2
            );

            ifStatementNode1 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode1
            );

            switchCaseNode = Nodes.getSwitchCaseNode(
                Nodes.getLiteralNode(1),
                [
                    ifStatementNode2
                ]
            );

            switchStatementNode = Nodes.getSwitchStatementNode(
                Nodes.getLiteralNode(1),
                [
                    switchCaseNode
                ]
            );

            functionDeclarationBlockStatementNode = Nodes.getBlockStatementNode([
                expressionStatementNode1,
                ifStatementNode1,
                switchStatementNode
            ]);

            functionDeclarationNode = Nodes.getFunctionDeclarationNode('test', [], functionDeclarationBlockStatementNode);

            programNode = Nodes.getProgramNode([
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

    describe('getUnaryExpressionArgumentNode (unaryExpressionNode: ESTree.UnaryExpression): ESTree.Node', () => {
        let expectedNode: ESTree.Literal,
            unaryExpressionArgumentNode: ESTree.Node;

        before(() => {
            const literalNode: ESTree.Literal = Nodes.getLiteralNode('test');
            const unaryExpressionNode2: ESTree.UnaryExpression = Nodes.getUnaryExpressionNode('!', literalNode);
            const unaryExpressionNode1: ESTree.UnaryExpression = Nodes.getUnaryExpressionNode('!', unaryExpressionNode2);
            const expressionStatementNode: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(unaryExpressionNode1);
            const programNode: ESTree.Program = Nodes.getProgramNode([
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

    describe('parentize <T extends ESTree.Node> (astTree: T): T', () => {
        let ifStatementNode: ESTree.IfStatement,
            ifStatementBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            programNode: ESTree.Program;

        beforeEach(() => {
            expressionStatementNode1 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode2 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            ifStatementBlockStatementNode = Nodes.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);

            ifStatementNode = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode
            );
        });

        describe('Variant #1: parentize AST-tree with `ProgramNode` as root node', () => {
            beforeEach(() => {
                programNode = Nodes.getProgramNode([
                    ifStatementNode
                ]);

                programNode = NodeUtils.parentize(programNode);
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
                ifStatementNode = NodeUtils.parentize(ifStatementNode);
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

    describe('parentizeNode <T extends ESTree.Node = ESTree.Program> (node: T, parentNode: ESTree.Node): T', () => {
        describe('Variant #1: node with parent node', () => {
            const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
            const breakStatement: ESTree.BreakStatement = Nodes.getBreakStatement(identifier);

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
            const identifier: ESTree.Identifier = Nodes.getIdentifierNode('Foo');
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
