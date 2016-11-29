import { interfaces } from 'inversify';

export interface IInversifyContainerFacade {
    get <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T;
    getTagged <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>, key: string, value: any): T;
}
