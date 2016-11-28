import { Container, interfaces } from 'inversify';
import { ServiceIdentifiers } from './ServiceIdentifiers';

import { nodeControlFlowTransformersModule } from './modules/NodeControlFlowTransformersModule';
import { nodeObfuscatorsModule } from './modules/NodeObfuscatorsModule';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IInputOptions } from '../interfaces/IInputOptions';
import { INodeTransformer } from '../interfaces/INodeTransformer';
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

        this.container.load(nodeControlFlowTransformersModule);
        this.container.load(nodeObfuscatorsModule);

        this.container
            .bind<IOptions>(ServiceIdentifiers.IOptions)
            .toDynamicValue(() => {
                return new Options(options);
            })
            .inSingletonScope();

        this.container
            .bind<IObfuscator>(ServiceIdentifiers.IObfuscator)
            .to(Obfuscator);

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

        this.container
            .bind<INodeTransformer[]>(ServiceIdentifiers['Factory<INodeTransformer[]>'])
            .toFactory<INodeTransformer[]>((context: interfaces.Context) => {
                return (nodeTransformersMap: Map<string, string[]>) => (nodeType: string) => {
                    const nodeTransformers: string[] = nodeTransformersMap.get(nodeType) || [];
                    const instancesArray: INodeTransformer[] = [];

                    nodeTransformers.forEach((transformer: string) => {
                        instancesArray.push(
                            context.container.getNamed<INodeTransformer>('INodeTransformer', transformer)
                        );
                    });

                    return instancesArray;
                };
            });
    }

    /**
     * @param serviceIdentifier
     * @returns {T}
     */
    public get <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }
}
