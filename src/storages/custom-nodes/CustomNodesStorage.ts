import { TCustomNodesFactory } from '../../types/TCustomNodesFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from '../../interfaces/IObfuscationEventEmitter';
import { IOptions } from '../../interfaces/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { ConsoleOutputCustomNodesFactory } from '../../custom-nodes/console-output-nodes/factory/ConsoleOutputCustomNodesFactory';
import { DebugProtectionCustomNodesFactory } from '../../custom-nodes/debug-protection-nodes/factory/DebugProtectionCustomNodesFactory';
import { DomainLockCustomNodesFactory } from '../../custom-nodes/domain-lock-nodes/factory/DomainLockCustomNodesFactory';
import { MapStorage } from '../MapStorage';
import { SelfDefendingCustomNodesFactory } from '../../custom-nodes/self-defending-nodes/factory/SelfDefendingCustomNodesFactory';
import { StringArrayCustomNodesFactory } from '../../custom-nodes/string-array-nodes/factory/StringArrayCustomNodesFactory';

export class CustomNodesStorage extends MapStorage <ICustomNode> {
    /**
     * @type {TCustomNodesFactory[]}
     */
    private static readonly customNodesFactories: TCustomNodesFactory[] = [
        DomainLockCustomNodesFactory,
        SelfDefendingCustomNodesFactory,
        ConsoleOutputCustomNodesFactory,
        DebugProtectionCustomNodesFactory,
        StringArrayCustomNodesFactory
    ];

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param options
     */
    constructor (options: IOptions) {
        super();

        this.options = options;
    }
    /**
     * @param obfuscationEventEmitter
     * @param stackTraceData
     */
    public initialize (obfuscationEventEmitter: IObfuscationEventEmitter, stackTraceData: IStackTraceData[]): void {
        const customNodes: [string, ICustomNode][] = [];

        CustomNodesStorage.customNodesFactories.forEach((customNodesFactoryConstructor: TCustomNodesFactory) => {
            const customNodesFactory: Map <string, ICustomNode> | undefined = new customNodesFactoryConstructor(
                this.options
            ).initializeCustomNodes(
                obfuscationEventEmitter,
                stackTraceData
            );

            if (!customNodesFactory) {
                return;
            }

            customNodes.push(...customNodesFactory);
        });

        this.storage = new Map <string, ICustomNode> (customNodes);
    }
}
