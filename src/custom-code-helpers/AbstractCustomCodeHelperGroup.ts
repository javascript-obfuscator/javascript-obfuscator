import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithStatements } from '../types/node/TNodeWithStatements';

import { ICallsGraphData } from '../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';
import { ICustomCodeHelper } from '../interfaces/custom-code-helpers/ICustomCodeHelper';
import { ICustomCodeHelperGroup } from '../interfaces/custom-code-helpers/ICustomCodeHelperGroup';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { CustomCodeHelper } from '../enums/custom-code-helpers/CustomCodeHelper';
import { ObfuscationEvent } from '../enums/event-emitters/ObfuscationEvent';

@injectable()
export abstract class AbstractCustomCodeHelperGroup implements ICustomCodeHelperGroup {
    /**
     * @type {IIdentifierNamesGenerator}
     */
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @type {ObfuscationEvent}
     */
    protected abstract readonly appendEvent: ObfuscationEvent;

    /**
     * @type {Map<CustomCodeHelper, ICustomCodeHelper>}
     */
    protected abstract customCodeHelpers: Map <CustomCodeHelper, ICustomCodeHelper>;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @returns {ObfuscationEvent}
     */
    public getAppendEvent (): ObfuscationEvent {
        return this.appendEvent;
    }

    /**
     * @returns {Map<CustomCodeHelper, ICustomCodeHelper>}
     */
    public getCustomCodeHelpers (): Map <CustomCodeHelper, ICustomCodeHelper> {
        return this.customCodeHelpers;
    }

    /**
     * @param {CustomCodeHelper} customCodeHelperName
     * @param {callback} callback
     */
    protected appendCustomNodeIfExist (customCodeHelperName: CustomCodeHelper, callback: (customCodeHelper: ICustomCodeHelper) => void): void {
        const customCodeHelper: ICustomCodeHelper | undefined = this.customCodeHelpers.get(customCodeHelperName);

        if (!customCodeHelper) {
            return;
        }

        callback(customCodeHelper);
    }

    /**
     * @param {number} callsGraphLength
     * @returns {number}
     */

    protected getRandomCallsGraphIndex (callsGraphLength: number): number {
        return this.randomGenerator.getRandomInteger(0, Math.max(0, Math.round(callsGraphLength - 1)));
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {ICallsGraphData[]} callsGraphData
     */
    public abstract appendNodes (nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void;

    public abstract initialize (): void;
}
