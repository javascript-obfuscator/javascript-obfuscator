import { ServiceIdentifier } from 'inversify';

import { TInputOptions } from '../../types/options/TInputOptions';

export interface IInversifyContainerFacade {
    /**
     * @param serviceIdentifier
     */
    get<T>(serviceIdentifier: ServiceIdentifier<T>): T;

    /**
     * @param serviceIdentifier
     * @param named
     */
    getNamed<T>(serviceIdentifier: ServiceIdentifier<T>, named: string | number | symbol): T;

    /**
     * @param {string} sourceCode
     * @param {string} sourceMap
     * @param {TInputOptions} options
     */
    load(sourceCode: string, sourceMap: string, options: TInputOptions): void;

    unload(): void;
}
