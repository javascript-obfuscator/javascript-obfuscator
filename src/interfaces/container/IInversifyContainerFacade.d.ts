import { interfaces } from 'inversify';

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
}
