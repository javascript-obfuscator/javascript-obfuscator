import 'reflect-metadata';

import { assert } from 'chai';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';
import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { INodeTransformer } from '../../../../src/interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../../src/enums/node-transformers/NodeTransformer';
import { TransformationStage } from '../../../../src/enums/node-transformers/TransformationStage';

import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('ScopeTransformer', () => {
    describe('transformNode', () => {
        let inversifyContainerFacade: IInversifyContainerFacade,
            scopeTransformer: INodeTransformer;

        beforeEach(() => {
            inversifyContainerFacade = new InversifyContainerFacade();
            inversifyContainerFacade.load('', {});

            scopeTransformer = inversifyContainerFacade
                .getNamed(ServiceIdentifiers.INodeTransformer, NodeTransformer.ScopeTransformer);
        });

        describe('Variant #1: `scope` property', () => {
            const identifierNode1: ESTree.Identifier = NodeFactory.identifierNode('foo');
            const identifierNode2: ESTree.Identifier = NodeFactory.identifierNode('bar');
            const expressionNode: ESTree.Expression = NodeFactory.binaryExpressionNode(
                '+',
                identifierNode1,
                identifierNode2
            );
            const expressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(
                expressionNode
            );
            const functionBlockStatementNode: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                expressionStatementNode
            ]);
            const functionDeclarationIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode('param');
            const functionDeclarationNode: ESTree.FunctionDeclaration = NodeFactory.functionDeclarationNode(
                'func',
                [functionDeclarationIdentifierNode],
                functionBlockStatementNode
            );
            const programNode: ESTree.Program = NodeFactory.programNode([
                functionDeclarationNode
            ]);

            beforeEach(() => {
                NodeUtils.parentizeAst(programNode);
                scopeTransformer.analyzeNode!(programNode, programNode.parentNode || null);

                estraverse.traverse(programNode, scopeTransformer.getVisitor(TransformationStage.Preparing)!);
            });

            describe('`scope` property existence on identifiers', () => {
                it('Variant #1: should add `scope` property with current node scope', () => {
                    assert.property(identifierNode1, 'scope');
                });

                it('Variant #2: should add `scope` property with current node scope', () => {
                    assert.property(functionDeclarationNode.params[0], 'scope');
                });

                it('Variant #3: should add `scope` property with current node scope', () => {
                    assert.property(functionDeclarationNode.id, 'scope');
                });
            });


            describe('`scope` property existence on other nodes', () => {
                it('Variant #1: should add `scope` property with current node scope', () => {
                    assert.notProperty(functionBlockStatementNode, 'scope');
                });

                it('Variant #2: should add `scope` property with current node scope', () => {
                    assert.notProperty(functionDeclarationNode, 'scope');
                });
            });

            describe('`scope` property value', () => {
                it('Variant #1: `scope` property shouldn\'t be null', () => {
                    assert.isNotNull(identifierNode1.scope);
                });

                it('Variant #2: `scope` property shouldn\'t be null', () => {
                    assert.isNotNull((<ESTree.Identifier>functionDeclarationNode.params[0]).scope);
                });

                it('Variant #3: `scope` property shouldn\'t be null', () => {
                    assert.isNotNull(functionDeclarationNode.id.scope);
                });
            });

            describe('`scope` property `block` reference', () => {
                it('Variant #1: `scope` property should contain current scope of the node', () => {
                    assert.equal(identifierNode1.scope!.block, functionDeclarationNode);
                });

                it('Variant #2: `scope` property should contain current scope of the node', () => {
                    assert.equal(
                        (<ESTree.Identifier>functionDeclarationNode.params[0]).scope!.block,
                        functionDeclarationNode
                    );
                });

                it('Variant #3: `scope` property should contain current scope of the node', () => {
                    assert.equal(functionDeclarationNode.id.scope!.block, programNode);
                });
            });

            describe('`scope` property `upper` reference', () => {
                it('Variant #1: `scope` property should contain current scope of the node', () => {
                    assert.equal(identifierNode1.scope!.upper!.block, programNode);
                });

                it('Variant #2: `scope` property should contain current scope of the node', () => {
                    assert.equal(
                        (<ESTree.Identifier>functionDeclarationNode.params[0]).scope!.upper!.block,
                        programNode
                    );
                });

                it('Variant #3: `scope` property should contain current scope of the node', () => {
                    assert.equal(functionDeclarationNode.id.scope!.upper, null);
                });
            });
        });

        describe('Variant #2: exception when no `parentNode` property', () => {
            const identifierNode1: ESTree.Identifier = NodeFactory.identifierNode('foo');
            const identifierNode2: ESTree.Identifier = NodeFactory.identifierNode('bar');
            const expressionNode: ESTree.Expression = NodeFactory.binaryExpressionNode(
                '+',
                identifierNode1,
                identifierNode2
            );
            const expressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(
                expressionNode
            );
            const functionBlockStatementNode: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                expressionStatementNode
            ]);
            const functionDeclarationNode: ESTree.FunctionDeclaration = NodeFactory.functionDeclarationNode(
                'func',
                [],
                functionBlockStatementNode
            );
            const programNode: ESTree.Program = NodeFactory.programNode([
                functionDeclarationNode
            ]);

            let testFunc: () => void;

            beforeEach(() => {
                scopeTransformer.analyzeNode!(programNode, programNode.parentNode || null);

                testFunc = () => {
                    estraverse.traverse(programNode, scopeTransformer.getVisitor(TransformationStage.Preparing)!)
                };
            });

            it('Should throws an error when node hasn\'t parent node', () => {
                assert.throw(testFunc, /parentNode/);
            });
        });

        describe('Variant #3: undefined `scopeManager`', () => {
            let identifierNode: ESTree.Node,
                transformedIdentifierNode: ESTree.Node | estraverse.VisitorOption;

            beforeEach(() => {
                identifierNode = NodeFactory.identifierNode('foo');
                NodeUtils.parentizeAst(identifierNode);
                transformedIdentifierNode = scopeTransformer.transformNode(identifierNode, identifierNode);
            });

            it('Should return untransformed node when `scopeManager` is not set', () => {
                assert.equal(identifierNode, transformedIdentifierNode);
            });

            it('Shouldn\'t attach `scope` property', () => {
                assert.notProperty(transformedIdentifierNode, 'scope');
            });
        });
    });
});
