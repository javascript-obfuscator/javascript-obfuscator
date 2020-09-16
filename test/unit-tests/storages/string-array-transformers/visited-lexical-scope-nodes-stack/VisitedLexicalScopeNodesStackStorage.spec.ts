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

    describe('getPenultimateElement', () => {
        describe('Variant #1: three array elements', () => {
            const firstElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
                NodeFactory.expressionStatementNode(
                    NodeFactory.literalNode('first')
                )
            ]);
            const expectedSecondElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
                NodeFactory.expressionStatementNode(
                    NodeFactory.literalNode('second')
                )
            ]);
            const lastElement: TNodeWithLexicalScopeStatements =  NodeFactory.blockStatementNode([
                NodeFactory.expressionStatementNode(
                    NodeFactory.literalNode('last')
                )
            ]);

            let penultimateElement: TNodeWithLexicalScopeStatements | undefined;

            before(() => {
                const visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage = getStorageInstance();

                visitedLexicalScopeNodesStackStorage.push(firstElement);
                visitedLexicalScopeNodesStackStorage.push(expectedSecondElement);
                visitedLexicalScopeNodesStackStorage.push(lastElement);
                penultimateElement = visitedLexicalScopeNodesStackStorage.getPenultimateElement();
            });

            it('should return a penultimate element from the stack', () => {
                assert.equal(penultimateElement, expectedSecondElement);
            });
        });

        describe('Variant #2: one array element', () => {
            const expectedPenultimateElement: undefined = undefined;
            const firstElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
                NodeFactory.expressionStatementNode(
                    NodeFactory.literalNode('first')
                )
            ]);

            let penultimateElement: TNodeWithLexicalScopeStatements | undefined;

            before(() => {
                const visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage = getStorageInstance();

                visitedLexicalScopeNodesStackStorage.push(firstElement);
                penultimateElement = visitedLexicalScopeNodesStackStorage.getPenultimateElement();
            });

            it('should return a penultimate element from the stack', () => {
                assert.equal(penultimateElement, expectedPenultimateElement);
            });
        });

        describe('Variant #3: empty array', () => {
            const expectedPenultimateElement: undefined = undefined;

            let penultimateElement: TNodeWithLexicalScopeStatements | undefined;

            before(() => {
                const visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage = getStorageInstance();

                penultimateElement = visitedLexicalScopeNodesStackStorage.getPenultimateElement();
            });

            it('should return a penultimate element from the stack', () => {
                assert.equal(penultimateElement, expectedPenultimateElement);
            });
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
        describe('Variant #1: few elements', () => {
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

        describe('Variant #2: single element', () => {
            const firstElement: TNodeWithLexicalScopeStatements = NodeFactory.blockStatementNode([
                NodeFactory.expressionStatementNode(
                    NodeFactory.literalNode('first')
                )
            ]);
            const expectedStorage: TNodeWithLexicalScopeStatements[] = [];
            const expectedPoppedElement: TNodeWithLexicalScopeStatements = firstElement;

            let storage: TNodeWithLexicalScopeStatements[];
            let poppedElement: TNodeWithLexicalScopeStatements | undefined;

            before(() => {
                const visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage = getStorageInstance();

                visitedLexicalScopeNodesStackStorage.push(firstElement);

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
});
