import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../../src/container/ServiceIdentifiers';

import { TInputOptions } from '../../../../../src/types/options/TInputOptions';
import { TNodeWithLexicalScopeStatements } from '../../../../../src/types/node/TNodeWithLexicalScopeStatements';

import { IInversifyContainerFacade } from '../../../../../src/interfaces/container/IInversifyContainerFacade';
import { IVisitedLexicalScopeNodesStackStorage } from '../../../../../src/interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { InversifyContainerFacade } from '../../../../../src/container/InversifyContainerFacade';
import { NodeFactory } from '../../../../../src/node/NodeFactory';

/**
 * @returns {IMapStorage<string, V>}
 */
const getStorageInstance = (options: TInputOptions = {}): IVisitedLexicalScopeNodesStackStorage => {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load('', '', {
        ...NO_ADDITIONAL_NODES_PRESET,
        ...options
    });

    const storage: IVisitedLexicalScopeNodesStackStorage = inversifyContainerFacade.get(ServiceIdentifiers.IVisitedLexicalScopeNodesStackStorage);

    storage.initialize();

    return storage;
};

describe('VisitedLexicalScopeNodesStackStorage', () => {
    describe('getLastElement', () => {
        const firstElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
            NodeFactory.expressionStatementNode(
                NodeFactory.literalNode('first')
            )
        ]);
        const secondElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
            NodeFactory.expressionStatementNode(
                NodeFactory.literalNode('second')
            )
        ]);
        const expectedLastElement: TNodeWithLexicalScopeStatements =  NodeFactory.blockStatementNode([
            NodeFactory.expressionStatementNode(
                NodeFactory.literalNode('last')
            )
        ]);

       let lastElement: TNodeWithLexicalScopeStatements | undefined;

        before(() => {
            const visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage = getStorageInstance();

            visitedLexicalScopeNodesStackStorage.push(firstElement);
            visitedLexicalScopeNodesStackStorage.push(secondElement);
            visitedLexicalScopeNodesStackStorage.push(expectedLastElement);
            lastElement = visitedLexicalScopeNodesStackStorage.getLastElement();
        });

        it('should return a last element from the stack', () => {
            assert.equal(lastElement, expectedLastElement);
        });
    });

    describe('push', () => {
        const firstElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
            NodeFactory.expressionStatementNode(
                NodeFactory.literalNode('first')
            )
        ]);
        const secondElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
            NodeFactory.expressionStatementNode(
                NodeFactory.literalNode('second')
            )
        ]);
        const expectedStorage: TNodeWithLexicalScopeStatements[] = [
            firstElement,
            secondElement
        ];

        let storage: TNodeWithLexicalScopeStatements[];

        before(() => {
            const visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage = getStorageInstance();

            visitedLexicalScopeNodesStackStorage.push(firstElement);
            visitedLexicalScopeNodesStackStorage.push(secondElement);
            storage = visitedLexicalScopeNodesStackStorage.getStorage();
        });

        it('should push a new element into the storage', () => {
            assert.deepEqual(storage, expectedStorage);
        });
    });

    describe('pop', () => {
        const firstElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
            NodeFactory.expressionStatementNode(
                NodeFactory.literalNode('first')
            )
        ]);
        const secondElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
            NodeFactory.expressionStatementNode(
                NodeFactory.literalNode('second')
            )
        ]);
        const expectedStorage: TNodeWithLexicalScopeStatements[] = [
            firstElement
        ];
        const expectedPoppedElement: TNodeWithLexicalScopeStatements = secondElement;

        let storage: TNodeWithLexicalScopeStatements[];
        let poppedElement: TNodeWithLexicalScopeStatements | undefined;

        before(() => {
            const visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage = getStorageInstance();

            visitedLexicalScopeNodesStackStorage.push(firstElement);
            visitedLexicalScopeNodesStackStorage.push(secondElement);

            poppedElement = visitedLexicalScopeNodesStackStorage.pop();
            storage = visitedLexicalScopeNodesStackStorage.getStorage();
        });

        it('should pop a last element from the storage', () => {
            assert.deepEqual(storage, expectedStorage);
        });

        it('should return a popped element from the storage', () => {
            assert.equal(poppedElement, expectedPoppedElement);
        });
    });
});
