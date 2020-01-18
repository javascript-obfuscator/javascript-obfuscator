import 'reflect-metadata';

import { assert } from 'chai';
import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IScopeAnalyzer } from '../../../../src/interfaces/analyzers/scope-analyzer/IScopeAnalyzer';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';
import { NodeFactory } from '../../../../src/node/NodeFactory';

describe('ScopeAnalyzer', () => {
    let scopeAnalyzer: IScopeAnalyzer;

    beforeEach(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        scopeAnalyzer = inversifyContainerFacade
            .get<IScopeAnalyzer>(ServiceIdentifiers.IScopeAnalyzer);
    });

    describe('analyze', () => {
        const expectedScopeVariablesLength: number = 1;
        const expectedScopeVariablesName: string = 'foo';

        let scopeVariablesLength: number;
        let scopeVariableName: string;

        describe('Variant #1: base analyze of the scope for ProgramNode', () => {
            beforeEach(() => {
                const programNode: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('foo'),
                            NodeFactory.literalNode(1)
                        )
                    ])
                ]);

                scopeAnalyzer.analyze(programNode);

                const scope: eslintScope.Scope = scopeAnalyzer.acquireScope(programNode);

                scopeVariablesLength = scope.variables.length;
                scopeVariableName = scope.variables[0].name;
            });

            it('should return scope data with variables', () => {
                assert.equal(scopeVariablesLength, expectedScopeVariablesLength);
            });

            it('should return scope data with correct variable name', () => {
                assert.equal(scopeVariableName, expectedScopeVariablesName);
            });
        });

        describe('Variant #2: Acquire of the scope for VariableDeclarationNode', () => {
            const expectedError: string = 'Cannot acquire scope for node';

            let testFunc: () => eslintScope.Scope;

            beforeEach(() => {
                const variableDeclarationNode: ESTree.VariableDeclaration = NodeFactory.variableDeclarationNode([
                    NodeFactory.variableDeclaratorNode(
                        NodeFactory.identifierNode('foo'),
                        NodeFactory.literalNode(1)
                    )
                ]);
                const programNode: ESTree.Program = NodeFactory.programNode([variableDeclarationNode]);

                scopeAnalyzer.analyze(programNode);

                testFunc = () => scopeAnalyzer.acquireScope(variableDeclarationNode);
            });

            it('should throw error', () => {
                assert.throws(testFunc, expectedError);
            });
        });

        describe('Variant #3: acquire scope without analyzing', () => {
            const expectedError: string = 'Scope manager is not defined';

            let testFunc: () => eslintScope.Scope;

            beforeEach(() => {
                const programNode: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('foo'),
                            NodeFactory.literalNode(1)
                        )
                    ])
                ]);

                testFunc = () => scopeAnalyzer.acquireScope(programNode);
            });

            it('should throw error', () => {
                assert.throws(testFunc, expectedError);
            });
        });

        describe('Variant #4: analyzing error', () => {
            const expectedError: ErrorConstructor = Error;

            let testFunc: () => void;

            beforeEach(() => {
                const variableDeclarationNode: ESTree.VariableDeclaration = NodeFactory.variableDeclarationNode([
                    NodeFactory.variableDeclaratorNode(
                        NodeFactory.identifierNode('foo'),
                        NodeFactory.literalNode(1)
                    )
                ]);
                const programNode: ESTree.Program = NodeFactory.programNode([variableDeclarationNode]);

                testFunc = () => {
                    scopeAnalyzer.analyze(programNode);
                    scopeAnalyzer.analyze(variableDeclarationNode);
                };
            });

            it('should throw error', () => {
                assert.throws(testFunc, expectedError);
            });
        });

        describe('Variant #5: cannot read property `0` of undefined error', () => {
            const expectedError: string = 'Cannot read property';

            let testFunc: () => void;

            beforeEach(() => {
                const variableDeclarationNode: ESTree.VariableDeclaration = NodeFactory.variableDeclarationNode([
                    NodeFactory.variableDeclaratorNode(
                        NodeFactory.identifierNode('foo'),
                        NodeFactory.literalNode(1)
                    )
                ]);
                const programNode: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.ifStatementNode(
                        NodeFactory.binaryExpressionNode(
                            '+',
                            NodeFactory.literalNode(1),
                            NodeFactory.literalNode(2)
                        ),
                        NodeFactory.blockStatementNode([
                            variableDeclarationNode
                        ]),
                        NodeFactory.blockStatementNode([
                            NodeFactory.functionDeclarationNode(
                                'bar',
                                [],
                                NodeFactory.blockStatementNode([
                                    variableDeclarationNode
                                ])
                            )
                        ])
                    )
                ]);

                testFunc = () => {
                    scopeAnalyzer.analyze(programNode);
                };
            });

            it('should does not throw error', () => {
                assert.doesNotThrow(testFunc, expectedError);
            });
        });
    });
});
