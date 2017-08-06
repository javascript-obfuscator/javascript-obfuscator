import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeGuard } from './types/node/TNodeGuard';
import { TNodeTransformerFactory } from './types/container/node-transformers/TNodeTransformerFactory';
import { TVisitorDirection } from './types/TVisitorDirection';
import { TVisitorFunction } from './types/TVisitorFunction';
import { TVisitorResult } from './types/TVisitorResult';

import { ICustomNodeGroup } from './interfaces/custom-nodes/ICustomNodeGroup';
import { ILogger } from './interfaces/logger/ILogger';
import { IObfuscationEventEmitter } from './interfaces/event-emitters/IObfuscationEventEmitter';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/options/IOptions';
import { IStackTraceAnalyzer } from './interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';
import { IStorage } from './interfaces/storages/IStorage';
import { IVisitor } from './interfaces/IVisitor';

import { LoggingMessage } from './enums/logger/LoggingMessage';
import { NodeTransformer } from './enums/container/node-transformers/NodeTransformer';
import { ObfuscationEvent } from './enums/event-emitters/ObfuscationEvent';
import { VisitorDirection } from './enums/VisitorDirection';

import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';

@injectable()
export class Obfuscator implements IObfuscator {
    /**
     * @type {((node: Node) => boolean)[]}
     */
    private static readonly blackListGuards: TNodeGuard[] = [
        Node.isUseStrictOperator
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly controlFlowTransformersList: NodeTransformer[] = [
        NodeTransformer.BlockStatementControlFlowTransformer,
        NodeTransformer.FunctionControlFlowTransformer
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly convertingTransformersList: NodeTransformer[] = [
        NodeTransformer.MemberExpressionTransformer,
        NodeTransformer.MethodDefinitionTransformer,
        NodeTransformer.TemplateLiteralTransformer
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly deadCodeInjectionTransformersList: NodeTransformer[] = [
        NodeTransformer.DeadCodeInjectionTransformer
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly obfuscatingTransformersList: NodeTransformer[] = [
        NodeTransformer.CatchClauseTransformer,
        NodeTransformer.FunctionDeclarationTransformer,
        NodeTransformer.FunctionTransformer,
        NodeTransformer.LabeledStatementTransformer,
        NodeTransformer.LiteralTransformer,
        NodeTransformer.ObjectExpressionTransformer,
        NodeTransformer.VariableDeclarationTransformer
    ];

    /**
     * @type {IStorage<ICustomNodeGroup>}
     */
    private readonly customNodeGroupStorage: IStorage<ICustomNodeGroup>;

    /**
     * @type {Ilogger}
     */
    private readonly logger: ILogger;

    /**
     * @type {TNodeTransformerFactory}
     */
    private readonly nodeTransformerFactory: TNodeTransformerFactory;

    /**
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {IStackTraceAnalyzer}
     */
    private readonly stackTraceAnalyzer: IStackTraceAnalyzer;

    /**
     * @param {IStackTraceAnalyzer} stackTraceAnalyzer
     * @param {IObfuscationEventEmitter} obfuscationEventEmitter
     * @param {IStorage<ICustomNodeGroup>} customNodeGroupStorage
     * @param {TNodeTransformerFactory} nodeTransformerFactory
     * @param {ILogger} logger
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IStackTraceAnalyzer) stackTraceAnalyzer: IStackTraceAnalyzer,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customNodeGroupStorage: IStorage<ICustomNodeGroup>,
        @inject(ServiceIdentifiers.Factory__INodeTransformer) nodeTransformerFactory: TNodeTransformerFactory,
        @inject(ServiceIdentifiers.ILogger) logger: ILogger,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupStorage = customNodeGroupStorage;
        this.nodeTransformerFactory = nodeTransformerFactory;
        this.logger = logger;
        this.options = options;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private static isBlackListNode (node: ESTree.Node): boolean {
        const guardsLength: number = Obfuscator.blackListGuards.length;

        for (let i: number = 0; i < guardsLength; i++) {
            if (Obfuscator.blackListGuards[i](node)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {Program} astTree
     * @returns {Program}
     */
    public obfuscateAstTree (astTree: ESTree.Program): ESTree.Program {
        if (Node.isProgramNode(astTree) && !astTree.body.length) {
            this.logger.warn(LoggingMessage.EmptySourceCode);

            return astTree;
        }

        astTree = <ESTree.Program>NodeUtils.parentize(astTree);

        const stackTraceData: IStackTraceData[] = this.stackTraceAnalyzer.analyze(astTree.body);

        // initialize custom node groups and configure custom nodes
        this.customNodeGroupStorage
            .getStorage()
            .forEach((customNodeGroup: ICustomNodeGroup) => {
                customNodeGroup.initialize();

                this.obfuscationEventEmitter.once(
                    customNodeGroup.getAppendEvent(),
                    customNodeGroup.appendCustomNodes.bind(customNodeGroup)
                );
            });

        this.obfuscationEventEmitter.emit(ObfuscationEvent.BeforeObfuscation, astTree, stackTraceData);

        // first pass transformers: dead code injection transformer
        if (this.options.deadCodeInjection) {
            this.logger.info(LoggingMessage.StageDeadCodeInjection);

            astTree = this.transformAstTree(astTree, Obfuscator.deadCodeInjectionTransformersList);
        }

        // second pass transformers: control flow flattening transformers
        if (this.options.controlFlowFlattening) {
            this.logger.info(LoggingMessage.StageControlFlowFlattening);

            astTree = this.transformAstTree(astTree, Obfuscator.controlFlowTransformersList);
        }

        // third pass: converting and obfuscating transformers
        this.logger.info(LoggingMessage.StageObfuscation);
        astTree = this.transformAstTree(astTree, [
            ...Obfuscator.convertingTransformersList,
            ...Obfuscator.obfuscatingTransformersList
        ]);

        this.obfuscationEventEmitter.emit(ObfuscationEvent.AfterObfuscation, astTree, stackTraceData);

        return astTree;
    }

    /**
     * @param {Program} astTree
     * @param {NodeTransformer[]} nodeTransformers
     * @returns {Program}
     */
    private transformAstTree (astTree: ESTree.Program, nodeTransformers: NodeTransformer[]): ESTree.Program {
        if (!nodeTransformers.length) {
            return astTree;
        }

        const enterVisitors: IVisitor[] = [];
        const leaveVisitors: IVisitor[] = [];
        const nodeTransformersLength: number = nodeTransformers.length;

        let visitor: IVisitor;

        for (let i: number = 0; i < nodeTransformersLength; i++) {
            visitor = this.nodeTransformerFactory(nodeTransformers[i]).getVisitor();

            if (visitor.enter) {
                enterVisitors.push(visitor);
            }

            if (visitor.leave) {
                leaveVisitors.push(visitor);
            }
        }

        estraverse.replace(astTree, {
            enter: this.mergeVisitorsForDirection(enterVisitors, VisitorDirection.Enter),
            leave: this.mergeVisitorsForDirection(leaveVisitors, VisitorDirection.Leave)
        });

        return astTree;
    }

    /**
     * @param {IVisitor[]} visitors
     * @param {TVisitorDirection} direction
     * @returns {TVisitorFunction}
     */
    private mergeVisitorsForDirection (visitors: IVisitor[], direction: TVisitorDirection): TVisitorFunction {
        const visitorsLength: number = visitors.length;

        if (!visitorsLength) {
            return (node: ESTree.Node, parentNode: ESTree.Node) => node;
        }

        return (node: ESTree.Node, parentNode: ESTree.Node) => {
            if (Obfuscator.isBlackListNode(node)) {
                return estraverse.VisitorOption.Skip;
            }

            for (let i: number = 0; i < visitorsLength; i++) {
                const visitorFunction: TVisitorFunction | undefined = visitors[i][direction];

                if (!visitorFunction) {
                    continue;
                }

                const visitorResult: TVisitorResult = visitorFunction(node, parentNode);

                if (!visitorResult || !Node.isNode(visitorResult)) {
                    continue;
                }

                node = visitorResult;
            }

            return node;
        };
    }
}
