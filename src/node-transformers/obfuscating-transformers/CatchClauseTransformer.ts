import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { IdentifierObfuscatingReplacer } from '../../enums/container/node-transformers/IdentifierObfuscatingReplacer';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

/**
 * replaces:
 *     try {} catch (e) { console.log(e); };
 *
 * on:
 *     try {} catch (_0x12d45f) { console.log(_0x12d45f); };
 *
 */
@injectable()
export class CatchClauseTransformer extends AbstractNodeTransformer {
    /**
     * @type {IIdentifierObfuscatingReplacer}
     */
    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    /**
     * @param {TIdentifierObfuscatingReplacerFactory} identifierObfuscatingReplacerFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
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
                if (Node.isCatchClauseNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param {CatchClause} catchClauseNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (catchClauseNode: ESTree.CatchClause, parentNode: ESTree.Node): ESTree.Node {
        const nodeIdentifier: number = this.nodeIdentifier++;

        this.storeCatchClauseParam(catchClauseNode, nodeIdentifier);
        this.replaceCatchClauseParam(catchClauseNode, nodeIdentifier);

        return catchClauseNode;
    }

    /**
     * @param {CatchClause} catchClauseNode
     * @param {number} nodeIdentifier
     */
    private storeCatchClauseParam (catchClauseNode: ESTree.CatchClause, nodeIdentifier: number): void {
        if (Node.isIdentifierNode(catchClauseNode.param)) {
            this.identifierObfuscatingReplacer.storeNames(catchClauseNode.param.name, nodeIdentifier);
        }
    }

    /**
     * @param {CatchClause} catchClauseNode
     * @param {number} nodeIdentifier
     */
    private replaceCatchClauseParam (catchClauseNode: ESTree.CatchClause, nodeIdentifier: number): void {
        estraverse.replace(catchClauseNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
                    const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
                    const newIdentifierName: string = newIdentifier.name;

                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        node.obfuscatedNode = true;
                    }
                }
            }
        });
    }
}
