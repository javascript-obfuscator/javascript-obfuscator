import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TObfuscationReplacerFactory } from '../../types/container/TObfuscationReplacerFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscationReplacerWithStorage } from '../../interfaces/node-transformers/IObfuscationReplacerWithStorage';
import { IVisitor } from '../../interfaces/IVisitor';

import { ObfuscationReplacers } from '../../enums/container/ObfuscationReplacers';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

/**
 * replaces:
 *     label: {
 *          for (var i = 0; i < 1000; i++) {
 *              break label;
 *          }
 *     }
 *
 * on:
 *     _0x12d45f: {
 *          for (var i = 0; i < 1000; i++) {
 *              break _0x12d45f;
 *          }
 *     }
 *
 */
@injectable()
export class LabeledStatementTransformer extends AbstractNodeTransformer {
    /**
     * @type {IObfuscationReplacerWithStorage}
     */
    private readonly identifierReplacer: IObfuscationReplacerWithStorage;

    /**
     * @param obfuscationReplacerFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscationReplacer) obfuscationReplacerFactory: TObfuscationReplacerFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscationReplacerWithStorage>obfuscationReplacerFactory(ObfuscationReplacers.IdentifierReplacer);
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isLabeledStatementNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param labeledStatementNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (labeledStatementNode: ESTree.LabeledStatement, parentNode: ESTree.Node): ESTree.Node {
        const nodeIdentifier: number = this.nodeIdentifier++;

        this.storeLabeledStatementName(labeledStatementNode, nodeIdentifier);
        this.replaceLabeledStatementName(labeledStatementNode, nodeIdentifier);

        return labeledStatementNode;
    }

    /**
     * @param labeledStatementNode
     * @param nodeIdentifier
     */
    private storeLabeledStatementName (labeledStatementNode: ESTree.LabeledStatement, nodeIdentifier: number): void {
        this.identifierReplacer.storeNames(labeledStatementNode.label.name, nodeIdentifier);
    }

    /**
     * @param labeledStatementNode
     * @param nodeIdentifier
     */
    private replaceLabeledStatementName (labeledStatementNode: ESTree.LabeledStatement, nodeIdentifier: number): void {
        estraverse.replace(labeledStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isLabelIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name, nodeIdentifier);
                }
            }
        });
    }
}
