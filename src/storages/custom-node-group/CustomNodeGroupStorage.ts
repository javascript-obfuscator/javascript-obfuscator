import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TCustomNodeGroupFactory } from '../../types/container/custom-nodes/TCustomNodeGroupFactory';

import { ICustomNodeGroup } from '../../interfaces/custom-nodes/ICustomNodeGroup';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { CustomNodeGroup } from '../../enums/custom-nodes/CustomNodeGroup';

import { MapStorage } from '../MapStorage';

@injectable()
export class CustomNodeGroupStorage extends MapStorage <ICustomNodeGroup> {
    /**
     * @type {CustomNodeGroup[]}
     */
    private static readonly customNodeGroupsList: CustomNodeGroup[] = [
        CustomNodeGroup.ConsoleOutputCustomNodeGroup,
        CustomNodeGroup.DebugProtectionCustomNodeGroup,
        CustomNodeGroup.DomainLockCustomNodeGroup,
        CustomNodeGroup.SelfDefendingCustomNodeGroup,
        CustomNodeGroup.StringArrayCustomNodeGroup
    ];

    /**
     * @type {TCustomNodesFactoriesFactory}
     */
    private readonly customNodeGroupFactory: TCustomNodeGroupFactory;

    /**
     * @param {TCustomNodeGroupFactory} customNodeGroupFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNodeGroup) customNodeGroupFactory: TCustomNodeGroupFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.customNodeGroupFactory = customNodeGroupFactory;
    }

    @postConstruct()
    public initialize (): void {
        this.storage = new Map <string, ICustomNodeGroup>();
        this.storageId = this.randomGenerator.getRandomString(6);

        CustomNodeGroupStorage.customNodeGroupsList.forEach((customNodeGroupName: CustomNodeGroup) => {
            const customNodeGroup: ICustomNodeGroup = this.customNodeGroupFactory(
                customNodeGroupName
            );

            if (!customNodeGroup) {
                return;
            }

            this.storage.set(customNodeGroupName, customNodeGroup);
        });

        console.log(123, this.constructor.name);
    }
}
