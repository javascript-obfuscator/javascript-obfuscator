import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TLiteralObfuscatingReplacerFactory } from '../../types/container/node-transformers/TLiteralObfuscatingReplacerFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { LiteralObfuscatingReplacer } from '../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class LiteralTransformer extends AbstractNodeTransformer {
    /**
     * @type {TLiteralObfuscatingReplacerFactory}
     */
    private readonly literalObfuscatingReplacerFactory: TLiteralObfuscatingReplacerFactory;

    /**
     * @type {IStringArrayStorageAnalyzer}
     */
    private readonly stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer;

    /**
     * @param {TLiteralObfuscatingReplacerFactory} literalObfuscatingReplacerFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IStringArrayStorageAnalyzer} stringArrayStorageAnalyzer
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscatingReplacer)
            literalObfuscatingReplacerFactory: TLiteralObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IStringArrayStorageAnalyzer) stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer
    ) {
        super(randomGenerator, options);

        this.literalObfuscatingReplacerFactory = literalObfuscatingReplacerFactory;
        this.stringArrayStorageAnalyzer = stringArrayStorageAnalyzer;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Obfuscating:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (NodeGuards.isProgramNode(node)) {
                            this.analyzeNode(node);
                        }

                        if (parentNode && NodeGuards.isLiteralNode(node) && !NodeMetadata.isReplacedLiteral(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    public analyzeNode (programNode: ESTree.Program): void {
        this.stringArrayStorageAnalyzer.analyze(programNode);
    }

    /**
     * @param {Literal} literalNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node {
        if (this.isProhibitedNode(literalNode, parentNode)) {
            return literalNode;
        }

        let newLiteralNode: ESTree.Node;

        switch (typeof literalNode.value) {
            case 'boolean':
                newLiteralNode = this.literalObfuscatingReplacerFactory(
                    LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer
                ).replace(literalNode);

                break;

            case 'number':
                newLiteralNode = this.literalObfuscatingReplacerFactory(
                    LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer
                ).replace(literalNode);

                break;

            case 'string':
                newLiteralNode = this.literalObfuscatingReplacerFactory(
                    LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer
                ).replace(literalNode);

                break;

            default:
                newLiteralNode = literalNode;
        }

        NodeUtils.parentizeNode(newLiteralNode, parentNode);

        return newLiteralNode;
    }

    /**
     * @param {Literal} literalNode
     * @param {Node} parentNode
     * @returns {boolean}
     */
    private isProhibitedNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): boolean {
        if (NodeGuards.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return true;
        }

        if (NodeGuards.isImportDeclarationNode(parentNode)) {
            return true;
        }

        return false;
    }
}
