import 'reflect-metadata';

import { assert } from 'chai';

import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';
import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { INodeTransformer } from '../../../../src/interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../../src/enums/node-transformers/NodeTransformer';
import { Nodes } from '../../../../src/node/Nodes';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('ParentificationTransformer', () => {
    describe('transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node', () => {
        let inversifyContainerFacade: IInversifyContainerFacade,
            parentificationTransformer: INodeTransformer;

        before(() => {
            inversifyContainerFacade = new InversifyContainerFacade();
            inversifyContainerFacade.load('', {});

            parentificationTransformer = inversifyContainerFacade
                .getNamed(ServiceIdentifiers.INodeTransformer, NodeTransformer.ParentificationTransformer);
        });

        describe('variant #1: node with parent node', () => {
            const identifier: ESTree.Identifier = Nodes.getIdentifierNode('foo');
            const breakStatement: ESTree.BreakStatement = Nodes.getBreakStatement(identifier);

            const expectedResult: ESTree.Identifier = NodeUtils.clone(identifier);

            let result: ESTree.Identifier;

            before(() => {
                expectedResult.parentNode = breakStatement;

                result = <ESTree.Identifier>parentificationTransformer.transformNode(identifier, breakStatement);
            });

            it('should parentize given node', () => {
                assert.deepEqual(result, expectedResult);
            });
        });

        describe('variant #2: node without parent node', () => {
            const identifier: ESTree.Identifier = Nodes.getIdentifierNode('Foo');
            const expectedResult: ESTree.Identifier = NodeUtils.clone(identifier);

            let result: ESTree.Identifier;

            before(() => {
                expectedResult.parentNode = expectedResult;

                result = <ESTree.Identifier>parentificationTransformer.transformNode(identifier, <any>null);
            });

            it('should parentize given node', () => {
                assert.deepEqual(result, expectedResult);
            });
        });
    });
});
