import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomCodeHelperGroupStorage } from '../../types/storages/TCustomCodeHelperGroupStorage';
import { TCustomCodeHelpersGroupAppendMethodName } from '../../types/custom-code-helpers/TCustomCodeHelpersGroupAppendMethodName';

import { ICustomCodeHelperGroup } from '../../interfaces/custom-code-helpers/ICustomCodeHelperGroup';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ICallsGraphAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer';
import { ICallsGraphData } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';
import { IPrevailingKindOfVariablesAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Analyzing AST-tree and appending custom code helpers
 */
@injectable()
export class CustomCodeHelpersTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer.ParentificationTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.ParentificationTransformer,
        NodeTransformer.VariablePreserveTransformer
    ];

    /**
     * @type {TCustomCodeHelperGroupStorage}
     */
    private readonly customCodeHelperGroupStorage: TCustomCodeHelperGroupStorage;

    /**
     * @type {ICallsGraphAnalyzer}
     */
    private readonly callsGraphAnalyzer: ICallsGraphAnalyzer;

    /**
     * @type {ICallsGraphData[]}
     */
    private callsGraphData: ICallsGraphData[] = [];

    /**
     * @type {IPrevailingKindOfVariablesAnalyzer}
     */
    private readonly prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer;

    /**
     * @param {ICallsGraphAnalyzer} callsGraphAnalyzer
     * @param {IPrevailingKindOfVariablesAnalyzer} prevailingKindOfVariablesAnalyzer
     * @param {TCustomCodeHelperGroupStorage} customCodeHelperGroupStorage
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.ICallsGraphAnalyzer) callsGraphAnalyzer: ICallsGraphAnalyzer,
        @inject(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
            prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer,
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customCodeHelperGroupStorage: TCustomCodeHelperGroupStorage,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.callsGraphAnalyzer = callsGraphAnalyzer;
        this.prevailingKindOfVariablesAnalyzer = prevailingKindOfVariablesAnalyzer;
        this.customCodeHelperGroupStorage = customCodeHelperGroupStorage;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Preparing:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (NodeGuards.isProgramNode(node)) {
                            this.prepareNode(node, parentNode);
                            this.appendCustomNodesForPreparingStage(node, parentNode);

                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (NodeGuards.isProgramNode(node)) {
                            this.appendCustomNodesForStage(nodeTransformationStage, node, parentNode);
                        }

                        return node;
                    }
                };
        }
    }

    /**
     * @param {Program} node
     * @param {Node | null} parentNode
     */
    public prepareNode (node: ESTree.Program, parentNode: ESTree.Node | null): void {
        this.callsGraphData = this.callsGraphAnalyzer.analyze(node);
        this.prevailingKindOfVariablesAnalyzer.analyze(node);
    }

    /**
     * @param {Program} node
     * @param {Node | null} parentNode
     * @returns {Node}
     */
    public transformNode (node: ESTree.Program, parentNode: ESTree.Node | null): ESTree.Node {
        return node;
    }

    /**
     * @param {Program} node
     * @param {Node | null} parentNode
     */
    private appendCustomNodesForPreparingStage (node: ESTree.Program, parentNode: ESTree.Node | null): void {
        this.customCodeHelperGroupStorage
            .getStorage()
            .forEach((customCodeHelperGroup: ICustomCodeHelperGroup) => {
                customCodeHelperGroup.initialize();
                customCodeHelperGroup.appendOnPreparingStage?.(node, this.callsGraphData);
            });
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @param {Program} node
     * @param {Node | null} parentNode
     */
    private appendCustomNodesForStage (
        nodeTransformationStage: NodeTransformationStage,
        node: ESTree.Program,
        parentNode: ESTree.Node | null
    ): void {
        this.customCodeHelperGroupStorage
            .getStorage()
            .forEach((customCodeHelperGroup: ICustomCodeHelperGroup) => {
                const methodName: TCustomCodeHelpersGroupAppendMethodName = `appendOn${nodeTransformationStage}Stage`;

                customCodeHelperGroup[methodName]?.(node, this.callsGraphData);
            });
    }
}
