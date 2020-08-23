import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomCodeHelperGroupStorage } from '../../types/storages/TCustomCodeHelperGroupStorage';

import { ICustomCodeHelperGroup } from '../../interfaces/custom-code-helpers/ICustomCodeHelperGroup';
import { IObfuscationEventEmitter } from '../../interfaces/event-emitters/IObfuscationEventEmitter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ICallsGraphAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer';
import { ICallsGraphData } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';
import { IPrevailingKindOfVariablesAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';
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
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

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
     * @param {IObfuscationEventEmitter} obfuscationEventEmitter
     * @param {TCustomCodeHelperGroupStorage} customCodeHelperGroupStorage
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.ICallsGraphAnalyzer) callsGraphAnalyzer: ICallsGraphAnalyzer,
        @inject(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
            prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customCodeHelperGroupStorage: TCustomCodeHelperGroupStorage,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.callsGraphAnalyzer = callsGraphAnalyzer;
        this.prevailingKindOfVariablesAnalyzer = prevailingKindOfVariablesAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
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
                            this.appendCustomNodesBeforeObfuscation(node, parentNode);

                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            case NodeTransformationStage.Finalizing:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): void => {
                        if (NodeGuards.isProgramNode(node)) {
                            this.appendCustomNodesAfterObfuscation(node, parentNode);
                        }
                    }
                };

            default:
                return null;
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
    private appendCustomNodesBeforeObfuscation (node: ESTree.Program, parentNode: ESTree.Node | null): void {
        this.customCodeHelperGroupStorage
            .getStorage()
            .forEach((customCodeHelperGroup: ICustomCodeHelperGroup) => {
                customCodeHelperGroup.initialize();

                this.obfuscationEventEmitter.once(
                    customCodeHelperGroup.getAppendEvent(),
                    customCodeHelperGroup.appendNodes.bind(customCodeHelperGroup)
                );
            });

        this.obfuscationEventEmitter.emit(ObfuscationEvent.BeforeObfuscation, node, this.callsGraphData);
    }

    /**
     * @param {Program} node
     * @param {Node | null} parentNode
     */
    private appendCustomNodesAfterObfuscation (node: ESTree.Program, parentNode: ESTree.Node | null): void {
        this.obfuscationEventEmitter.emit(ObfuscationEvent.AfterObfuscation, node, this.callsGraphData);
    }
}
