import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TDeadCodeInjectionReplacerFactory } from '../../types/container/TDeadCodeInjectionReplacerFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IVisitor } from '../../interfaces/IVisitor';

import { DeadCodeInjectionReplacers } from '../../enums/container/DeadCodeInjectionReplacers';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

@injectable()
export class DeadCodeInjectionTransformer extends AbstractNodeTransformer {
    /**
     * @type {DeadCodeInjectionReplacers[]}
     */
    private static readonly deadCodeInjectionReplacersList: DeadCodeInjectionReplacers[] = [
        DeadCodeInjectionReplacers.IfStatementDeadCodeInjectionReplacer
    ];

    /**
     * @type {TDeadCodeInjectionReplacerFactory}
     */
    private deadCodeInjectionReplacerFactory: TDeadCodeInjectionReplacerFactory;

    /**
     * @param deadCodeInjectionReplacerFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IDeadCodeInjectionReplacer) deadCodeInjectionReplacerFactory: TDeadCodeInjectionReplacerFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.deadCodeInjectionReplacerFactory = deadCodeInjectionReplacerFactory;
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            leave: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isBlockStatementNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param blockStatementNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (blockStatementNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node {
        if (
            !this.options.deadCodeInjection ||
            RandomGeneratorUtils.getMathRandom() > this.options.deadCodeInjectionThreshold
        ) {
            return blockStatementNode;
        }

        this.transformBlockStatementNode(blockStatementNode);

        return blockStatementNode;
    }

    /**
     * @param blockStatementNode
     */
    private transformBlockStatementNode (blockStatementNode: ESTree.BlockStatement): void {
        estraverse.replace(blockStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                let newNode: ESTree.Node = node;

                DeadCodeInjectionTransformer.deadCodeInjectionReplacersList.forEach((replacerName: DeadCodeInjectionReplacers) => {
                    newNode = {
                        ...this.deadCodeInjectionReplacerFactory(replacerName).replace(node, parentNode),
                        parentNode
                    };
                });

                return newNode;
            }
        });
    }
}
