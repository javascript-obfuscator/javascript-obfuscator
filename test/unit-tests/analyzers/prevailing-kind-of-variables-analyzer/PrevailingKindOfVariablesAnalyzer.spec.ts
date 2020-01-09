import 'reflect-metadata';

import { assert } from 'chai';
import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IPrevailingKindOfVariablesAnalyzer } from '../../../../src/interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';
import { NodeFactory } from '../../../../src/node/NodeFactory';

describe('PrevailingKindOfVariablesAnalyzer', () => {
    let prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        prevailingKindOfVariablesAnalyzer = inversifyContainerFacade
            .get<IPrevailingKindOfVariablesAnalyzer>(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer);
    });

    describe('analyze', () => {
        let prevailingKindOfVariables: ESTree.VariableDeclaration['kind'];

        describe('Prevailing `var` kind', () => {
            const expectedPrevailingKind: ESTree.VariableDeclaration['kind'] = 'var';

            before(() => {
                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('foo'),
                                null
                            )
                        ],
                        'var'
                    ),
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('bar'),
                                null
                            )
                        ],
                        'const'
                    ),
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('baz'),
                                null
                            )
                        ],
                        'var'
                    )
                ]);

                prevailingKindOfVariablesAnalyzer.analyze(astTree);
                prevailingKindOfVariables = prevailingKindOfVariablesAnalyzer.getPrevailingKind();
            });

            it('should return correct prevailing kind of variables', () => {
                assert.equal(prevailingKindOfVariables, expectedPrevailingKind);
            });
        });

        describe('Prevailing `let` kind', () => {
            const expectedPrevailingKind: ESTree.VariableDeclaration['kind'] = 'let';

            before(() => {
                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('foo'),
                                null
                            )
                        ],
                        'let'
                    ),
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('bar'),
                                null
                            )
                        ],
                        'var'
                    ),
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('baz'),
                                null
                            )
                        ],
                        'let'
                    )
                ]);

                prevailingKindOfVariablesAnalyzer.analyze(astTree);
                prevailingKindOfVariables = prevailingKindOfVariablesAnalyzer.getPrevailingKind();
            });

            it('should return correct prevailing kind of variables', () => {
                assert.equal(prevailingKindOfVariables, expectedPrevailingKind);
            });
        });

        describe('Prevailing `const` kind', () => {
            const expectedPrevailingKind: ESTree.VariableDeclaration['kind'] = 'const';

            before(() => {
                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('foo'),
                                null
                            )
                        ],
                        'let'
                    ),
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('bar'),
                                null
                            )
                        ],
                        'const'
                    ),
                    NodeFactory.variableDeclarationNode(
                        [
                            NodeFactory.variableDeclaratorNode(
                                NodeFactory.identifierNode('baz'),
                                null
                            )
                        ],
                        'const'
                    )
                ]);

                prevailingKindOfVariablesAnalyzer.analyze(astTree);
                prevailingKindOfVariables = prevailingKindOfVariablesAnalyzer.getPrevailingKind();
            });

            it('should return correct prevailing kind of variables', () => {
                assert.equal(prevailingKindOfVariables, expectedPrevailingKind);
            });
        });

        describe('No variables', () => {
            const expectedPrevailingKind: ESTree.VariableDeclaration['kind'] = 'var';

            before(() => {
                const astTree: ESTree.Program = NodeFactory.programNode();

                prevailingKindOfVariablesAnalyzer.analyze(astTree);
                prevailingKindOfVariables = prevailingKindOfVariablesAnalyzer.getPrevailingKind();
            });

            it('should return correct prevailing kind of variables', () => {
                assert.equal(prevailingKindOfVariables, expectedPrevailingKind);
            });
        });
    });
});
