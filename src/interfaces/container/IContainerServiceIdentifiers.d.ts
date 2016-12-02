import { interfaces } from 'inversify';

export interface IContainerServiceIdentifiers {
    'Factory<ICalleeDataExtractor>': interfaces.ServiceIdentifier<any>;
    'Factory<IControlFlowReplacer>': interfaces.ServiceIdentifier<any>;
    'Factory<ICustomNode>': interfaces.ServiceIdentifier<any>;
    'Factory<ICustomNodesFactory>': interfaces.ServiceIdentifier<any>;
    'Factory<INodeTransformer[]>': interfaces.ServiceIdentifier<any>;
    'Factory<IObfuscationResult>': interfaces.ServiceIdentifier<any>;
    'Factory<IReplacer>': interfaces.ServiceIdentifier<any>;
    ICalleeDataExtractor: interfaces.ServiceIdentifier<any>;
    IControlFlowReplacer: interfaces.ServiceIdentifier<any>;
    ICustomNode: interfaces.ServiceIdentifier<any>;
    ICustomNodesFactory: interfaces.ServiceIdentifier<any>;
    IJavaScriptObfuscator: interfaces.ServiceIdentifier<any>;
    INodeTransformer: interfaces.ServiceIdentifier<any>;
    IObfuscationEventEmitter: interfaces.ServiceIdentifier<any>;
    IObfuscationResult: interfaces.ServiceIdentifier<any>;
    IObfuscator: interfaces.ServiceIdentifier<any>;
    IOptions: interfaces.ServiceIdentifier<any>;
    IReplacer: interfaces.ServiceIdentifier<any>;
    ISourceMapCorrector: interfaces.ServiceIdentifier<any>;
    IStackTraceAnalyzer: interfaces.ServiceIdentifier<any>;
    'IStorage<ICustomNode>': interfaces.ServiceIdentifier<any>;
    [key: string]: interfaces.ServiceIdentifier<any>;
}
