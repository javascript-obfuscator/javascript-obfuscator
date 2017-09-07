import { Container, interfaces } from 'inversify';
import { ServiceIdentifiers } from './ServiceIdentifiers';

import { analyzersModule } from './modules/analyzers/AnalyzersModule';
import { controlFlowTransformersModule } from './modules/node-transformers/ControlFlowTransformersModule';
import { customNodesModule } from './modules/custom-nodes/CustomNodesModule';
import { nodeGuardsModule } from './modules/node-guards/NodeGuardsModule';
import { nodeTransformersModule } from './modules/node-transformers/NodeTransformersModule';
import { obfuscatingTransformersModule } from './modules/node-transformers/ObfuscatingTransformersModule';
import { storagesModule } from './modules/storages/StoragesModule';
import { utilsModule } from './modules/utils/UtilsModule';

import { TInputOptions } from '../types/options/TInputOptions';

import { IInversifyContainerFacade } from '../interfaces/container/IInversifyContainerFacade';
import { IJavaScriptObfuscator } from '../interfaces/IJavaScriptObfsucator';
import { ILogger } from '../interfaces/logger/ILogger';
import { IObfuscationEventEmitter } from '../interfaces/event-emitters/IObfuscationEventEmitter';
import { IObfuscationResult } from '../interfaces/IObfuscationResult';
import { IOptions } from '../interfaces/options/IOptions';
import { ISourceCode } from '../interfaces/ISourceCode';
import { ISourceMapCorrector } from '../interfaces/ISourceMapCorrector';
import { ITransformersRunner } from '../interfaces/ITransformersRunner';

import { JavaScriptObfuscator } from '../JavaScriptObfuscator';
import { Logger } from '../logger/Logger';
import { ObfuscationEventEmitter } from '../event-emitters/ObfuscationEventEmitter';
import { ObfuscationResult } from '../ObfuscationResult';
import { Options } from "../options/Options";
import { SourceCode } from '../SourceCode';
import { SourceMapCorrector } from '../SourceMapCorrector';
import { TransformersRunner } from '../TransformersRunner';

export class InversifyContainerFacade implements IInversifyContainerFacade {
    /**
     * @type {interfaces.Container}
     */
    private readonly container: interfaces.Container;

    constructor () {
        this.container = new Container();
    }

    /**
     * @param {interfaces.ServiceIdentifier<U>} serviceIdentifier
     * @returns {U}
     */
    public static getFactory <T extends number, U> (
        serviceIdentifier: interfaces.ServiceIdentifier<U>
    ): (context: interfaces.Context) => (bindingName: T) => U {
        return (context: interfaces.Context): (bindingName: T) => U => {
            return (bindingName: T) => {
                return context.container.getNamed<U>(serviceIdentifier, bindingName);
            };
        };
    }

    /**
     * @param {interfaces.ServiceIdentifier<U>} serviceIdentifier
     * @returns {U}
     */
    public static getCacheFactory <T extends number, U> (
        serviceIdentifier: interfaces.ServiceIdentifier<U>
    ): (context: interfaces.Context) => (bindingName: T) => U {
        return (context: interfaces.Context): (bindingName: T) => U => {
            const cache: Map <T, U> = new Map();

            return (bindingName: T) => {
                if (cache.has(bindingName)) {
                    return <U>cache.get(bindingName);
                }

                const object: U = context.container.getNamed<U>(serviceIdentifier, bindingName);

                cache.set(bindingName, object);

                return object;
            };
        };
    }

    /**
     * @param {interfaces.ServiceIdentifier<interfaces.Newable<U>>} serviceIdentifier
     * @param {any[]} dependencies
     * @returns {U}
     */
    public static getConstructorFactory <T extends number, U> (
        serviceIdentifier: interfaces.ServiceIdentifier<interfaces.Newable<U>>,
        ...dependencies: any[]
    ): (context: interfaces.Context) => (bindingName: T) => U {
        return (context: interfaces.Context): (bindingName: T) => U => {
            const cache: Map<T, interfaces.Newable<U>> = new Map();
            const cachedDependencies: any[] = [];

            return (bindingName: T) => {
                dependencies.forEach((dependency: any, index: number) => {
                    if (!cachedDependencies[index]) {
                        cachedDependencies[index] = context.container.get<any>(dependency);
                    }
                });

                if (cache.has(bindingName)) {
                    return new (<interfaces.Newable<U>>cache.get(bindingName))(...cachedDependencies);
                }

                const constructor: interfaces.Newable<U> = context.container
                    .getNamed<interfaces.Newable<U>>(
                        serviceIdentifier,
                        bindingName
                    );

                cache.set(bindingName, constructor);

                return new constructor(...cachedDependencies);
            };
        };
    }

    /**
     * @param {interfaces.ServiceIdentifier<T>} serviceIdentifier
     * @returns {T}
     */
    public get <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }

    /**
     * @param {interfaces.ServiceIdentifier<T>} serviceIdentifier
     * @param {string | number | symbol} named
     * @returns {T}
     */
    public getNamed <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T {
        return this.container.getNamed<T>(serviceIdentifier, named);
    }

    /**
     * @param {string} sourceCode
     * @param {TInputOptions} options
     */
    public load (sourceCode: string, options: TInputOptions): void {
        this.container
            .bind<ISourceCode>(ServiceIdentifiers.ISourceCode)
            .toDynamicValue(() => new SourceCode(sourceCode))
            .inSingletonScope();

        this.container
            .bind<IOptions>(ServiceIdentifiers.IOptions)
            .toDynamicValue(() => new Options(options))
            .inSingletonScope();

        this.container
            .bind<ILogger>(ServiceIdentifiers.ILogger)
            .to(Logger)
            .inSingletonScope();

        this.container
            .bind<IJavaScriptObfuscator>(ServiceIdentifiers.IJavaScriptObfuscator)
            .to(JavaScriptObfuscator)
            .inSingletonScope();

        this.container
            .bind<ITransformersRunner>(ServiceIdentifiers.ITransformersRunner)
            .to(TransformersRunner)
            .inSingletonScope();

        this.container
            .bind<IObfuscationResult>(ServiceIdentifiers.IObfuscationResult)
            .to(ObfuscationResult)
            .inSingletonScope();

        this.container
            .bind<IObfuscationResult>(ServiceIdentifiers.Factory__IObfuscationResult)
            .toFactory<IObfuscationResult>((context: interfaces.Context) => {
                return (obfuscatedCode: string, sourceMap: string) => {
                    const obfuscationResult: IObfuscationResult = context.container
                        .get<IObfuscationResult>(ServiceIdentifiers.IObfuscationResult);

                    obfuscationResult.initialize(obfuscatedCode, sourceMap);

                    return obfuscationResult;
                };
            });

        this.container
            .bind<ISourceMapCorrector>(ServiceIdentifiers.ISourceMapCorrector)
            .to(SourceMapCorrector)
            .inSingletonScope();

        this.container
            .bind<IObfuscationEventEmitter>(ServiceIdentifiers.IObfuscationEventEmitter)
            .to(ObfuscationEventEmitter)
            .inSingletonScope();

        // modules
        this.container.load(analyzersModule);
        this.container.load(controlFlowTransformersModule);
        this.container.load(customNodesModule);
        this.container.load(nodeGuardsModule);
        this.container.load(nodeTransformersModule);
        this.container.load(obfuscatingTransformersModule);
        this.container.load(storagesModule);
        this.container.load(utilsModule);
    }

    public unload (): void {
        this.container.unbindAll();
    }
}
