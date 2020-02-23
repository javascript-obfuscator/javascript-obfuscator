import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TCustomCodeHelperGroupFactory } from '../../types/container/custom-code-helpers/TCustomCodeHelperGroupFactory';

import { ICustomCodeHelperGroup } from '../../interfaces/custom-code-helpers/ICustomCodeHelperGroup';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { CustomCodeHelperGroup } from '../../enums/custom-code-helpers/CustomCodeHelperGroup';

import { MapStorage } from '../MapStorage';

@injectable()
export class CustomCodeHelperGroupStorage extends MapStorage <string, ICustomCodeHelperGroup> {
    /**
     * @type {CustomCodeHelperGroup[]}
     */
    private static readonly customCodeHelperGroupsList: CustomCodeHelperGroup[] = [
        CustomCodeHelperGroup.ConsoleOutput,
        CustomCodeHelperGroup.DebugProtection,
        CustomCodeHelperGroup.DomainLock,
        CustomCodeHelperGroup.SelfDefending,
        CustomCodeHelperGroup.StringArray
    ];

    /**
     * @type {TCustomNodesFactoriesFactory}
     */
    private readonly customCodeHelperGroupFactory: TCustomCodeHelperGroupFactory;

    /**
     * @param {TCustomCodeHelperGroupFactory} customCodeHelperGroupFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__ICustomCodeHelperGroup) customCodeHelperGroupFactory: TCustomCodeHelperGroupFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.customCodeHelperGroupFactory = customCodeHelperGroupFactory;
    }

    @postConstruct()
    public initialize (): void {
        super.initialize();

        CustomCodeHelperGroupStorage.customCodeHelperGroupsList.forEach((customCodeHelperGroupName: CustomCodeHelperGroup) => {
            const customCodeHelperGroup: ICustomCodeHelperGroup = this.customCodeHelperGroupFactory(customCodeHelperGroupName);

            this.storage.set(customCodeHelperGroupName, customCodeHelperGroup);
        });
    }
}
