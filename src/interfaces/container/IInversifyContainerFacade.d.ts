import { interfaces } from 'inversify';

import { TInputOptions } from '../../types/options/TInputOptions';

export interface IInversifyContainerFacade {
    /**
     * @param serviceIdentifier
     */
    get <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T;

    /**
     * @param serviceIdentifier
     * @param named
     */
    getNamed <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T;

    /**
     * @param options
     */
    load (options: TInputOptions): void;

    unload (): void;
}
