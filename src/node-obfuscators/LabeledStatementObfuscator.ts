import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/IOptions';

import { NodeType } from '../enums/NodeType';

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { IdentifierReplacer } from './replacers/IdentifierReplacer';
import { Node } from '../node/Node';
import { NodeUtils } from '../node/NodeUtils';

/**
 * replaces:
 *     try {} catch (e) { console.log(e); };
 *
 * on:
 *     try {} catch (_0x12d45f) { console.log(_0x12d45f); };
 *
 */
export class LabeledStatementObfuscator extends AbstractNodeObfuscator {
    /**
     * @type {IdentifierReplacer}
     */
    private identifierReplacer: IdentifierReplacer;

    /**
     * @param nodes
     * @param options
     */
    constructor(nodes: Map <string, ICustomNode>, options: IOptions) {
        super(nodes, options);

        this.identifierReplacer = new IdentifierReplacer(this.nodes, this.options);
    }

    /**
     * @param labeledStatementNode
     */
    public obfuscateNode (labeledStatementNode: ESTree.LabeledStatement): void {
        this.storeLabeledStatementName(labeledStatementNode);
        this.replaceLabeledStatementName(labeledStatementNode);
    }

    /**
     * @param labeledStatementNode
     */
    private storeLabeledStatementName (labeledStatementNode: ESTree.LabeledStatement): void {
        NodeUtils.typedReplace(labeledStatementNode.label, NodeType.Identifier, {
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
