import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/IVisitor';

import { IdentifierObfuscatingReplacer } from '../../enums/container/node-transformers/IdentifierObfuscatingReplacer';

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
     * @type {IIdentifierObfuscatingReplacer}
     */
    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    /**
     * @param identifierObfuscatingReplacerFactory
     * @param randomGenerator
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
            identifierObfuscatingReplacerFactory: TIdentifierObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(
            IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer
        );
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
        this.identifierObfuscatingReplacer.storeNames(labeledStatementNode.label.name, nodeIdentifier);
    }

    /**
     * @param labeledStatementNode
     * @param nodeIdentifier
     */
    private replaceLabeledStatementName (labeledStatementNode: ESTree.LabeledStatement, nodeIdentifier: number): void {
        estraverse.replace(labeledStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isLabelIdentifierNode(node, parentNode)) {
                    const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);

                    node.name = newIdentifier.name;
                }
            }
        });
    }
}
