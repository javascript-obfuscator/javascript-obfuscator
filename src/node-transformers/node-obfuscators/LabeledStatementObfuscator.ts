import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscatorReplacer } from '../../interfaces/node-transformers/IObfuscatorReplacer';
import { IObfuscatorReplacerWithStorage } from '../../interfaces/node-transformers/IObfuscatorReplacerWithStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';

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
export class LabeledStatementObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IObfuscatorReplacerWithStorage}
     */
    private readonly identifierReplacer: IObfuscatorReplacerWithStorage;

    /**
     * @param nodeObfuscatorsReplacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) nodeObfuscatorsReplacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscatorReplacerWithStorage>nodeObfuscatorsReplacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param labeledStatementNode
     * @returns {ESTree.Node}
     */
    public transformNode (labeledStatementNode: ESTree.LabeledStatement): ESTree.Node {
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
        NodeUtils.typedTraverse(labeledStatementNode.label, NodeType.Identifier, {
            enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name, nodeIdentifier)
        });
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
