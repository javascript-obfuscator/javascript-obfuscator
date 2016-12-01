import { IContainerServiceIdentifiers } from '../interfaces/container/IContainerServiceIdentifiers';

export const ServiceIdentifiers: IContainerServiceIdentifiers = {
    'Factory<ICalleeDataExtractor>': Symbol('Factory<ICalleeDataExtractor>'),
    'Factory<IControlFlowReplacer>': Symbol('Factory<IControlFlowReplacer>'),
    'Factory<INodeTransformer[]>': Symbol('Factory<INodeTransformer[]>'),
    'Factory<IObfuscationResult>': Symbol('Factory<IObfuscationResult>'),
    'Factory<IReplacer>': Symbol('Factory<IReplacer>'),
    ICalleeDataExtractor: Symbol('ICalleeDataExtractor'),
    IControlFlowReplacer: Symbol('IControlFlowReplacer'),
    IJavaScriptObfuscator: Symbol('IJavaScriptObfuscator'),
    INodeTransformer: Symbol('INodeTransformer'),
    IObfuscationEventEmitter: Symbol('IObfuscationEventEmitter'),
    IObfuscator: Symbol('IObfuscator'),
    IOptions: Symbol('IOptions'),
    IReplacer: Symbol('IReplacer'),
    ISourceMapCorrector: Symbol('ISourceMapCorrector'),
    IStackTraceAnalyzer: Symbol('IStackTraceAnalyzer'),
    'IStorage<ICustomNode>': Symbol('IStorage<ICustomNode>')
};
