import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeGroupStorage } from '../../types/storages/TCustomNodeGroupStorage';

import { ICustomNodeGroup } from '../../interfaces/custom-nodes/ICustomNodeGroup';
import { IObfuscationEventEmitter } from '../../interfaces/event-emitters/IObfuscationEventEmitter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStackTraceAnalyzer } from '../../interfaces/analyzers/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from '../../interfaces/analyzers/stack-trace-analyzer/IStackTraceData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Analyzing AST-tree and appending custom nodes
 */
@injectable()
export class CustomNodesTransformer extends AbstractNodeTransformer {
    /**
     * @type {TCustomNodeGroupStorage}
     */
    private readonly customNodeGroupStorage: TCustomNodeGroupStorage;

    /**
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

    /**
     * @type {IStackTraceAnalyzer}
     */
    private readonly stackTraceAnalyzer: IStackTraceAnalyzer;

    /**
     * @type {IStackTraceData[]}
     */
    private stackTraceData: IStackTraceData[] = [];

    /**
     * @param {IStackTraceAnalyzer} stackTraceAnalyzer
     * @param {IObfuscationEventEmitter} obfuscationEventEmitter
     * @param {TCustomNodeGroupStorage} customNodeGroupStorage
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IStackTraceAnalyzer) stackTraceAnalyzer: IStackTraceAnalyzer,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customNodeGroupStorage: TCustomNodeGroupStorage,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupStorage = customNodeGroupStorage;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Preparing:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (NodeGuards.isProgramNode(node)) {
                            this.analyzeNode(node, parentNode);
                            this.appendCustomNodesBeforeObfuscation(node, parentNode);

                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            case TransformationStage.Finalizing:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
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
    public analyzeNode (node: ESTree.Program, parentNode: ESTree.Node | null): void {
        this.stackTraceData = this.stackTraceAnalyzer.analyze(node);
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
        this.customNodeGroupStorage
            .getStorage()
            .forEach((customNodeGroup: ICustomNodeGroup) => {
                customNodeGroup.initialize();

                this.obfuscationEventEmitter.once(
                    customNodeGroup.getAppendEvent(),
                    customNodeGroup.appendCustomNodes.bind(customNodeGroup)
                );
            });

        this.obfuscationEventEmitter.emit(ObfuscationEvent.BeforeObfuscation, node, this.stackTraceData);
    }

    /**
     * @param {Program} node
     * @param {Node | null} parentNode
     */
    private appendCustomNodesAfterObfuscation (node: ESTree.Program, parentNode: ESTree.Node | null): void {
        this.obfuscationEventEmitter.emit(ObfuscationEvent.AfterObfuscation, node, this.stackTraceData);
    }
}
