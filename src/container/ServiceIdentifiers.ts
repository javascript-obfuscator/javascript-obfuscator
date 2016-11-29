import { IContainerServiceIdentifiers } from '../interfaces/container/IContainerServiceIdentifiers';

let ServiceIdentifiers: IContainerServiceIdentifiers = {
    'Factory<INodeTransformer[]>': Symbol('INodeTransformersFactory'),
    IJavaScriptObfuscator: Symbol('IJavaScriptObfuscator'),
    INodeTransformer: Symbol('INodeTransformer'),
    IObfuscationEventEmitter: Symbol('IObfuscationEventEmitter'),
    IObfuscator: Symbol('IObfuscator'),
    IOptions: Symbol('IOptions'),
    IStackTraceAnalyzer: Symbol('IStackTraceAnalyzer'),
    'IStorage<ICustomNode>': Symbol('IStorage<ICustomNode>')
};

export { ServiceIdentifiers };
