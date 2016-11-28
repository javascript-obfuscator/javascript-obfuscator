import { IContainerServiceIdentifiers } from '../interfaces/IContainerServiceIdentifiers';

let ServiceIdentifiers: IContainerServiceIdentifiers = {
    'Factory<INodeTransformer[]>': Symbol('INodeTransformersFactory'),
    INodeTransformer: Symbol('INodeTransformer'),
    IObfuscationEventEmitter: Symbol('IObfuscationEventEmitter'),
    IObfuscator: Symbol('IObfuscator'),
    IOptions: Symbol('IOptions'),
    IStackTraceAnalyzer: Symbol('IStackTraceAnalyzer'),
    'IStorage<ICustomNode>': Symbol('IStorage<ICustomNode>')
};

export { ServiceIdentifiers };
