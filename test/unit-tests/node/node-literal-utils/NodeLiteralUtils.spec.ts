import * as ESTree from 'estree';

import { assert } from 'chai';

import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeLiteralUtils } from '../../../../src/node/NodeLiteralUtils';

describe('NodeLiteralUtils', () => {
    describe('isStringLiteralNode', () => {
        describe('Variant #1: string literal node', () => {
            let result: boolean;

            before(() => {
                const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                result = NodeLiteralUtils.isStringLiteralNode(literalNode);
            });

            it('should return `true` for string literal node', () => {
                assert.isTrue(result);
            });
        });

        describe('Variant #2: number literal node', () => {
            let result: boolean;

            before(() => {
                const literalNode: ESTree.Literal = NodeFactory.literalNode(123);

                result = NodeLiteralUtils.isStringLiteralNode(literalNode);
            });

            it('should return `false` for number literal node', () => {
                assert.isFalse(result);
            });
        });

        describe('Variant #3: boolean literal node', () => {
            let result: boolean;

            before(() => {
                const literalNode: ESTree.Literal = NodeFactory.literalNode(true);

                result = NodeLiteralUtils.isStringLiteralNode(literalNode);
            });

            it('should return `false` for boolean literal node', () => {
                assert.isFalse(result);
            });
        });
    });

    describe('isProhibitedLiteralNode', () => {
        describe('String literal node', () => {
            describe('Variant #1: base string literal node', () => {
                const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                let statementNode: ESTree.Statement;

                before(() => {
                    statementNode = NodeFactory.expressionStatementNode(
                        literalNode
                    );

                    literalNode.parentNode = statementNode;
                });

                it('should return false for base string literal node', () => {
                    assert.equal(NodeLiteralUtils.isProhibitedLiteralNode(literalNode, statementNode), false);
                });
            });

            describe('Variant #2: property literal node', () => {
                describe('Variant #1: property key literal node', () => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                    let propertyNode: ESTree.Property;

                    before(() => {
                        propertyNode = NodeFactory.propertyNode(
                            literalNode,
                            NodeFactory.literalNode(1)
                        );

                        literalNode.parentNode = propertyNode;
                    });

                    it('should return false for property key literal node', () => {
                        assert.equal(NodeLiteralUtils.isProhibitedLiteralNode(literalNode, propertyNode), true);
                    });
                });

                describe('Variant #2: computed property key literal node', () => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                    let propertyNode: ESTree.Property;

                    before(() => {
                        propertyNode = NodeFactory.propertyNode(
                            literalNode,
                            NodeFactory.literalNode(1),
                            true
                        );

                        literalNode.parentNode = propertyNode;
                    });

                    it('should return false for computed property key literal node', () => {
                        assert.equal(NodeLiteralUtils.isProhibitedLiteralNode(literalNode, propertyNode), false);
                    });
                });

                describe('Variant #3: property value literal node', () => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                    let propertyNode: ESTree.Property;

                    before(() => {
                        propertyNode = NodeFactory.propertyNode(
                            NodeFactory.literalNode(1),
                            literalNode
                        );

                        literalNode.parentNode = propertyNode;
                    });

                    it('should return false for property value literal node', () => {
                        assert.equal(NodeLiteralUtils.isProhibitedLiteralNode(literalNode, propertyNode), false);
                    });
                });
            });

            describe('Variant #3: import declaration node', () => {
                describe('Variant #1: base import declaration literal node', () => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                    let importDeclarationNode: ESTree.ImportDeclaration;

                    before(() => {
                        importDeclarationNode = NodeFactory.importDeclarationNode(
                            [],
                            literalNode
                        );

                        literalNode.parentNode = importDeclarationNode;
                    });

                    it('should return false for import declaration literal node', () => {
                        assert.equal(NodeLiteralUtils.isProhibitedLiteralNode(literalNode, importDeclarationNode), true);
                    });
                });
            });

            describe('Variant #4: export named declaration node', () => {
                describe('Variant #1: base export named declaration literal node', () => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                    let exportNamedDeclarationNode: ESTree.ExportNamedDeclaration;

                    before(() => {
                        exportNamedDeclarationNode = NodeFactory.exportNamedDeclarationNode(
                            [],
                            literalNode
                        );

                        literalNode.parentNode = exportNamedDeclarationNode;
                    });

                    it('should return false for export named declaration literal node', () => {
                        assert.equal(NodeLiteralUtils.isProhibitedLiteralNode(literalNode, exportNamedDeclarationNode), true);
                    });
                });
            });

            describe('Variant #5: export all declaration node', () => {
                describe('Variant #1: base export all declaration literal node', () => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                    let exportAllDeclarationNode: ESTree.ExportAllDeclaration;

                    before(() => {
                        exportAllDeclarationNode = NodeFactory.exportAllDeclarationNode(
                            literalNode
                        );

                        literalNode.parentNode = exportAllDeclarationNode;
                    });

                    it('should return false for export all declaration literal node', () => {
                        assert.equal(NodeLiteralUtils.isProhibitedLiteralNode(literalNode, exportAllDeclarationNode), true);
                    });
                });
            });
        });

        describe('Number literal node', () => {
            describe('Variant #1: base number literal node', () => {
                const literalNode: ESTree.Literal = NodeFactory.literalNode(1);

                let statementNode: ESTree.Statement;

                before(() => {
                    statementNode = NodeFactory.expressionStatementNode(
                        literalNode
                    );

                    const blockStatementNode: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                        statementNode
                    ]);

                    statementNode.parentNode = blockStatementNode;
                    literalNode.parentNode = statementNode;
                });

                it('should return false for base number literal node', () => {
                    assert.equal(NodeLiteralUtils.isProhibitedLiteralNode(literalNode, statementNode), false);
                });
            });
        });
    });
});
