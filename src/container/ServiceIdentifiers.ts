import { IContainerServiceIdentifiers } from '../interfaces/container/IContainerServiceIdentifiers';

let ServiceIdentifiers: IContainerServiceIdentifiers = {
    'Factory<IControlFlowReplacer>': Symbol('Factory<IControlFlowReplacer>'),
    'Factory<INodeTransformer[]>': Symbol('Factory<INodeTransformer[]>'),
    'Factory<IReplacer>': Symbol('Factory<IReplacer>'),
    IControlFlowReplacer: Symbol('IControlFlowReplacer'),
    IJavaScriptObfuscator: Symbol('IJavaScriptObfuscator'),
    INodeTransformer: Symbol('INodeTransformer'),
    IObfuscationEventEmitter: Symbol('IObfuscationEventEmitter'),
    IObfuscator: Symbol('IObfuscator'),
    IOptions: Symbol('IOptions'),
    IReplacer: Symbol('IReplacer'),
    IStackTraceAnalyzer: Symbol('IStackTraceAnalyzer'),
    'IStorage<ICustomNode>': Symbol('IStorage<ICustomNode>')
};

export { ServiceIdentifiers };
