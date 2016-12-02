import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IReplacer } from '../../interfaces/node-transformers/IReplacer';
import { IStorage } from '../../interfaces/storages/IStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { IdentifierReplacer } from './replacers/IdentifierReplacer';
import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';
import { Utils } from '../../Utils';

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
     * @type {IdentifierReplacer}
     */
    private readonly identifierReplacer: IdentifierReplacer;

    /**
     * @param customNodesStorage
     * @param nodeObfuscatorsReplacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers['Factory<IReplacer>']) nodeObfuscatorsReplacersFactory: (replacer: NodeObfuscatorsReplacers) => IReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);

        this.identifierReplacer = <IdentifierReplacer>nodeObfuscatorsReplacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param labeledStatementNode
     */
    public transformNode (labeledStatementNode: ESTree.LabeledStatement): void {
        this.identifierReplacer.setPrefix(Utils.getRandomGenerator().string({
            length: 5,
            pool: Utils.randomGeneratorPool
        }));

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
