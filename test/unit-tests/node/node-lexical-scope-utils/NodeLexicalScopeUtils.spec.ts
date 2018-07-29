import * as ESTree from 'estree';

import { assert } from 'chai';

import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeLexicalScopeUtils } from '../../../../src/node/NodeLexicalScopeUtils';

describe('NodeLexicalScopeUtils', () => {
    describe('getParentScope', () => {
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

        it('should return lexical scope node for `program` node child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScope(programNode), programNode);
        });

        it('should return lexical scope node for `functionDeclaration` node child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScope(functionDeclarationNode), functionDeclarationNode);
        });

        it('should return lexical scope node for `functionDeclaration blockStatement` node child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScope(functionDeclarationBlockStatementNode), functionDeclarationNode);
        });

        it('should return lexical scope node for `expressionStatement` node #1 child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScope(expressionStatementNode1), functionDeclarationNode);
        });

        it('should return lexical scope node for `ifStatement` node child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScope(ifStatementNode1), functionDeclarationNode);
        });

        it('should return lexical scope node for `ifStatement blockStatement` node #1 child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScope(ifStatementBlockStatementNode1), functionDeclarationNode);
        });

        it('should return lexical scope node for `ifStatement blockStatement` node #2 child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScope(ifStatementBlockStatementNode2), functionDeclarationNode);
        });

        it('should return lexical scope node for `expressionStatement` node #3 child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScope(expressionStatementNode3), functionDeclarationNode);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeLexicalScopeUtils.getLexicalScope(expressionStatementNode2), ReferenceError);
        });
    });

    describe('getParentScopes', () => {
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

        it('should return lexical scope node for `program` node child node', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(programNode)[0], programNode);
        });

        it('should return lexical scope node for `functionDeclaration` node child node #1', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(functionDeclarationNode)[0], functionDeclarationNode);
        });

        it('should return lexical scope node for `functionDeclaration` node child node #2', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(functionDeclarationNode)[1], programNode);
        });

        it('should return lexical scope node for `functionDeclaration blockStatement` node child node #1', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(functionDeclarationBlockStatementNode)[0], functionDeclarationNode);
        });

        it('should return lexical scope node for `expressionStatement` node #1 child node #1', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(expressionStatementNode1)[0], functionDeclarationNode);
        });

        it('should return lexical scope node for `expressionStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(expressionStatementNode1)[1], programNode);
        });

        it('should return lexical scope node for `ifStatement` node child node #1', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(ifStatementNode1)[0], functionDeclarationNode);
        });

        it('should return lexical scope node for `ifStatement` node child node #2', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(ifStatementNode1)[1], programNode);
        });

        it('should return lexical scope node for `ifStatement blockStatement` node #1 child node #1', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(ifStatementBlockStatementNode1)[0], functionDeclarationNode);
        });

        it('should return lexical scope node for `ifStatement blockStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(ifStatementBlockStatementNode1)[1], programNode);
        });

        it('should return lexical scope node for `ifStatement blockStatement` node #2 child node #1', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(ifStatementBlockStatementNode2)[0], functionDeclarationNode);
        });

        it('should return lexical scope node for `ifStatement blockStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(ifStatementBlockStatementNode2)[1], programNode);
        });

        it('should return lexical scope node for `expressionStatement` node #3 child node #1', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(expressionStatementNode3)[0], functionDeclarationNode);
        });

        it('should return lexical scope node for `expressionStatement` node #3 child node #2', () => {
            assert.deepEqual(NodeLexicalScopeUtils.getLexicalScopes(expressionStatementNode3)[1], programNode);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeLexicalScopeUtils.getLexicalScopes(expressionStatementNode2)[0], ReferenceError);
        });
    });
});
