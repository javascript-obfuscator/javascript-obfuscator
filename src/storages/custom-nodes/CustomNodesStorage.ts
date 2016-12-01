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
import { IInitializable } from '../../interfaces/IInitializable';

@injectable()
export class CustomNodesStorage extends MapStorage <ICustomNode> implements IInitializable {
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
     * @type {boolean}
     */
    public initialized: boolean = false;

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

    public checkInitialization (): void {
        if (!this.initialized) {
            throw new Error(`\`CustomNodesStorage\` should be initialized first by calling \`initialize\` method!`);
        }
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
        this.initialized = true;
    }

    /**
     * @param key
     * @returns {ICustomNode}
     */
    public get (key: string | number): ICustomNode {
        this.checkInitialization();

        return super.get(key);
    }

    /**
     * @param value
     * @returns {string | number | null}
     */
    public getKeyOf (value: ICustomNode): string | number | null {
        this.checkInitialization();

        return super.getKeyOf(value);
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        this.checkInitialization();

        return super.getLength();
    }

    /**
     * @returns {Map <string | number, ICustomNode>}
     */
    public getStorage (): Map <string | number, ICustomNode> {
        this.checkInitialization();

        return super.getStorage();
    }
}
