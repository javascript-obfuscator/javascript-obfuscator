import { Container, interfaces } from 'inversify';
import { ServiceIdentifiers } from './ServiceIdentifiers';

import { nodeTransformersModule } from './modules/NodeTransformersModule';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IInputOptions } from '../interfaces/IInputOptions';
import { IObfuscationEventEmitter } from '../interfaces/IObfuscationEventEmitter';
import { IObfuscator } from '../interfaces/IObfuscator';
import { IOptions } from '../interfaces/IOptions';
import { IStackTraceAnalyzer } from '../interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStorage } from '../interfaces/IStorage';

import { CustomNodesStorage } from '../storages/custom-nodes/CustomNodesStorage';
import { ObfuscationEventEmitter } from '../event-emitters/ObfuscationEventEmitter';
import { Obfuscator } from '../Obfuscator';
import { Options } from "../options/Options";
import { StackTraceAnalyzer } from '../stack-trace-analyzer/StackTraceAnalyzer';

export class InversifyContainerFacade {
    /**
     * @type {interfaces.Container}
     */
    private container: interfaces.Container;

    /**
     * @param options
     */
    constructor (options: IInputOptions) {
        this.container = new Container();

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
    }

    /**
     * @param serviceIdentifier
     * @returns {T}
     */
    public get <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }
}
