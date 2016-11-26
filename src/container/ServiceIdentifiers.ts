import { IContainerServiceIdentifiers } from '../interfaces/IContainerServiceIdentifiers';

let ServiceIdentifiers: IContainerServiceIdentifiers = {
    IObfuscationEventEmitter: Symbol('IObfuscationEventEmitter'),
    IObfuscator: Symbol('IObfuscator'),
    IOptions: Symbol('IOptions'),
    IStackTraceAnalyzer: Symbol('IStackTraceAnalyzer'),
    IStorage: Symbol('IStorage')
};

export { ServiceIdentifiers };
