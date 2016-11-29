import { Container, interfaces } from 'inversify';
import { ServiceIdentifiers } from './ServiceIdentifiers';

import { nodeControlFlowTransformersModule } from './modules/node-transformers/NodeControlFlowTransformersModule';
import { nodeObfuscatorsModule } from './modules/node-transformers/NodeObfuscatorsModule';
import { nodeTransformersModule } from './modules/node-transformers/NodeTransformersModule';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IInputOptions } from '../interfaces/IInputOptions';
import { IJavaScriptObfuscator } from '../interfaces/IJavaScriptObfsucator';
import { IObfuscationEventEmitter } from '../interfaces/IObfuscationEventEmitter';
import { IObfuscator } from '../interfaces/IObfuscator';
import { IOptions } from '../interfaces/IOptions';
import { IStackTraceAnalyzer } from '../interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStorage } from '../interfaces/IStorage';

import { CustomNodesStorage } from '../storages/custom-nodes/CustomNodesStorage';
import { JavaScriptObfuscatorInternal } from '../JavaScriptObfuscatorInternal';
import { ObfuscationEventEmitter } from '../event-emitters/ObfuscationEventEmitter';
import { Obfuscator } from '../Obfuscator';
import { Options } from "../options/Options";
import { StackTraceAnalyzer } from '../stack-trace-analyzer/StackTraceAnalyzer';

export class InversifyContainerFacade {
    /**
     * @type {interfaces.Container}
     */
    private readonly container: interfaces.Container;

    /**
     * @param options
     */
    constructor (options: IInputOptions) {
        this.container = new Container();

        this.container
            .bind<IJavaScriptObfuscator>(ServiceIdentifiers.IJavaScriptObfuscator)
            .to(JavaScriptObfuscatorInternal)
            .inSingletonScope();

        this.container
            .bind<IOptions>(ServiceIdentifiers.IOptions)
            .toDynamicValue(() => {
                return new Options(options);
            })
            .inSingletonScope();

        this.container
            .bind<IObfuscator>(ServiceIdentifiers.IObfuscator)
            .to(Obfuscator)
            .inSingletonScope();

        this.container
            .bind<IObfuscationEventEmitter>(ServiceIdentifiers.IObfuscationEventEmitter)
            .to(ObfuscationEventEmitter)
            .inSingletonScope();

        this.container
            .bind<IStackTraceAnalyzer>(ServiceIdentifiers.IStackTraceAnalyzer)
            .to(StackTraceAnalyzer)
            .inSingletonScope();

        this.container
            .bind<IStorage<ICustomNode>>(ServiceIdentifiers['IStorage<ICustomNode>'])
            .to(CustomNodesStorage)
            .inSingletonScope();

        // modules
        this.container.load(nodeTransformersModule);
        this.container.load(nodeControlFlowTransformersModule);
        this.container.load(nodeObfuscatorsModule);
    }

    /**
     * @param serviceIdentifier
     * @returns {T}
     */
    public get <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }

    /**
     * @param serviceIdentifier
     * @param key
     * @param value
     * @returns {T}
     */
    public getTagged <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>, key: string, value: any): T {
        return this.container.getTagged<T>(serviceIdentifier, key, value);
    }
}
