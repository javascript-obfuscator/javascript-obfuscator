import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';
import { IStorage } from '../../interfaces/IStorage';

import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { IdentifierReplacer } from './replacers/IdentifierReplacer';
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
export class LabeledStatementObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IdentifierReplacer}
     */
    private readonly identifierReplacer: IdentifierReplacer;

    /**
     * @param customNodesStorage
     * @param options
     */
    constructor(customNodesStorage: IStorage<ICustomNode>, options: IOptions) {
        super(customNodesStorage, options);

        this.identifierReplacer = new IdentifierReplacer(this.customNodesStorage, this.options);
    }

    /**
     * @param labeledStatementNode
     */
    public transformNode (labeledStatementNode: ESTree.LabeledStatement): void {
        this.storeLabeledStatementName(labeledStatementNode);
        this.replaceLabeledStatementName(labeledStatementNode);
    }

    /**
     * @param labeledStatementNode
     */
    private storeLabeledStatementName (labeledStatementNode: ESTree.LabeledStatement): void {
        NodeUtils.typedTraverse(labeledStatementNode.label, NodeType.Identifier, {
            enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name)
        });
    }

    /**
     * @param labeledStatementNode
     */
    private replaceLabeledStatementName (labeledStatementNode: ESTree.LabeledStatement): void {
        estraverse.replace(labeledStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isLabelIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name);
                }
            }
        });
    }
}
