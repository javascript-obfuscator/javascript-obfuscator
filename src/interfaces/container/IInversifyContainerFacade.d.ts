import { interfaces } from 'inversify';

export interface IInversifyContainerFacade {
    get <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T;
}
