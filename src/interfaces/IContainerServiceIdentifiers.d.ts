import { interfaces } from 'inversify';

export interface IContainerServiceIdentifiers {
    IObfuscationEventEmitter: interfaces.ServiceIdentifier<any>;
    IObfuscator: interfaces.ServiceIdentifier<any>;
    IOptions: interfaces.ServiceIdentifier<any>;
    IStackTraceAnalyzer: interfaces.ServiceIdentifier<any>;
    IStorage: interfaces.ServiceIdentifier<any>;
    [key: string]: interfaces.ServiceIdentifier<any>;
}
