import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TCustomNodesFactory } from '../../types/container/TCustomNodesFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { ConsoleOutputCustomNodesFactory } from '../../custom-nodes/console-output-nodes/factory/ConsoleOutputCustomNodesFactory';
import { DebugProtectionCustomNodesFactory } from '../../custom-nodes/debug-protection-nodes/factory/DebugProtectionCustomNodesFactory';
import { DomainLockCustomNodesFactory } from '../../custom-nodes/domain-lock-nodes/factory/DomainLockCustomNodesFactory';
import { MapStorage } from '../MapStorage';
import { SelfDefendingCustomNodesFactory } from '../../custom-nodes/self-defending-nodes/factory/SelfDefendingCustomNodesFactory';
import { StringArrayCustomNodesFactory } from '../../custom-nodes/string-array-nodes/factory/StringArrayCustomNodesFactory';

@injectable()
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
    constructor (@inject(ServiceIdentifiers.IOptions) options: IOptions) {
        super();

        this.options = options;
    }
    /**
     * @param stackTraceData
     */
    public initialize (stackTraceData: IStackTraceData[]): void {
        const customNodes: [string, ICustomNode][] = [];

        CustomNodesStorage.customNodesFactories.forEach((customNodesFactoryConstructor: TCustomNodesFactory) => {
            const customNodesFactory: Map <string, ICustomNode> | undefined = new customNodesFactoryConstructor(
                this.options
            ).initializeCustomNodes(stackTraceData);

            if (!customNodesFactory) {
                return;
            }

            customNodes.push(...customNodesFactory);
        });

        this.storage = new Map <string, ICustomNode> (customNodes);
    }
}
