import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IInitializable } from '../../interfaces/IInitializable';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { CustomNodesFactories } from '../../enums/container/CustomNodesFactories';

import { MapStorage } from '../MapStorage';
import { TCustomNodesFactoriesFactory } from '../../types/container/TCustomNodesFactoriesFactory';

@injectable()
export class CustomNodesStorage extends MapStorage <ICustomNode> implements IInitializable {
    /**
     * @type {CustomNodesFactories[]}
     */
    private static readonly customNodesFactoriesList: CustomNodesFactories[] = [
        CustomNodesFactories.ConsoleOutputCustomNodesFactory,
        CustomNodesFactories.DebugProtectionCustomNodesFactory,
        CustomNodesFactories.DomainLockCustomNodesFactory,
        CustomNodesFactories.SelfDefendingCustomNodesFactory,
        CustomNodesFactories.StringArrayCustomNodesFactory
    ];

    /**
     * @type {TCustomNodesFactoriesFactory}
     */
    private readonly customNodesFactoriesFactory: TCustomNodesFactoriesFactory;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param customNodesFactoriesFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['Factory<ICustomNodesFactory>']) customNodesFactoriesFactory: TCustomNodesFactoriesFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super();

        this.customNodesFactoriesFactory = customNodesFactoriesFactory;
        this.options = options;
    }

    /**
     * @param stackTraceData
     */
    public initialize (stackTraceData: IStackTraceData[]): void {
        const customNodes: [string, ICustomNode][] = [];

        CustomNodesStorage.customNodesFactoriesList.forEach((customNodesFactoryName: CustomNodesFactories) => {
            const customNodesFactory: Map <string, ICustomNode> | undefined = this.customNodesFactoriesFactory(
                customNodesFactoryName
            ).initializeCustomNodes(stackTraceData);

            if (!customNodesFactory) {
                return;
            }

            customNodes.push(...customNodesFactory);
        });

        this.storage = new Map <string, ICustomNode> (customNodes);
    }

    /**
     * @param key
     * @returns {ICustomNode}
     */
    public get (key: string | number): ICustomNode {
        return super.get(key);
    }

    /**
     * @param value
     * @returns {string | number | null}
     */
    public getKeyOf (value: ICustomNode): string | number | null {
        return super.getKeyOf(value);
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        return super.getLength();
    }

    /**
     * @returns {Map <string | number, ICustomNode>}
     */
    public getStorage (): Map <string | number, ICustomNode> {
        return super.getStorage();
    }
}
