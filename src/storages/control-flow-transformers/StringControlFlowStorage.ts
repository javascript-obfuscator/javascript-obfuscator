import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { FunctionControlFlowStorage } from './FunctionControlFlowStorage';

@injectable()
export class StringControlFlowStorage extends FunctionControlFlowStorage {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     */
    public constructor (

        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
    ) {
        super(randomGenerator, options, identifierNamesGeneratorFactory);
    }

    public override initialize (): void {
        super.initialize();

        this.storageId = this.identifierNamesGenerator.generateForGlobalScope();
    }
}
