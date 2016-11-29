import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';
import { IReplacer } from '../../interfaces/IReplacer';
import { IStorage } from '../../interfaces/IStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { IdentifierReplacer } from './replacers/IdentifierReplacer';
import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * replaces:
 *     try {} catch (e) { console.log(e); };
 *
 * on:
 *     try {} catch (_0x12d45f) { console.log(_0x12d45f); };
 *
 */
@injectable()
export class CatchClauseObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IdentifierReplacer}
     */
    private readonly identifierReplacer: IReplacer & IdentifierReplacer;

    /**
     * @param customNodesStorage
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers['Factory<IReplacer>']) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);

        this.identifierReplacer = <IdentifierReplacer>replacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param catchClauseNode
     */
    public transformNode (catchClauseNode: ESTree.CatchClause): void {
        this.storeCatchClauseParam(catchClauseNode);
        this.replaceCatchClauseParam(catchClauseNode);
    }

    /**
     * @param catchClauseNode
     */
    private storeCatchClauseParam (catchClauseNode: ESTree.CatchClause): void {
        NodeUtils.typedTraverse(catchClauseNode.param, NodeType.Identifier, {
            enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name)
        });
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParam (catchClauseNode: ESTree.CatchClause): void {
        estraverse.replace(catchClauseNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name);
                }
            }
        });
    }
}
