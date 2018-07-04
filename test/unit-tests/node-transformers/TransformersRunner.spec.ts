import 'reflect-metadata';

import { assert } from 'chai';
import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';
import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { ITransformersRunner } from '../../../src/interfaces/node-transformers/ITransformersRunner';

import { TransformationStage } from '../../../src/enums/node-transformers/TransformationStage';

import { NodeFactory } from '../../../src/node/NodeFactory';


describe('TransformersRunner', () => {
    describe('transform', () => {
        let inversifyContainerFacade: IInversifyContainerFacade,
            transformersRunner: ITransformersRunner;

        before(() => {
            inversifyContainerFacade = new InversifyContainerFacade();
            inversifyContainerFacade.load('', {});

            transformersRunner = inversifyContainerFacade.get(ServiceIdentifiers.ITransformersRunner);
        });

        describe('Variant #1: empty `NodeTransformer` list', () => {
            let astTree: ESTree.Node,
                transformedAstTree: ESTree.Node;

            before(() => {
                astTree = NodeFactory.literalNode('foo');
                transformedAstTree = transformersRunner.transform(astTree, [], TransformationStage.Preparing);
            });

            it('Should return same AST tree when no transformers was passed', () => {
                assert.equal(astTree, transformedAstTree);
            });
        });
    });
});
