import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { ICodeTransformer } from '../interfaces/code-transformers/ICodeTransformer';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { CodeTransformer } from '../enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from '../enums/code-transformers/CodeTransformationStage';

@injectable()
export abstract class AbstractCodeTransformer implements ICodeTransformer {
    /**
     * @type {CodeTransformer[]}
     */
    public readonly runAfter: CodeTransformer[] | undefined;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    protected constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {string} code
     * @param {CodeTransformationStage} codeTransformationStage
     * @returns {string}
     */
    public abstract transformCode (code: string, codeTransformationStage: CodeTransformationStage): string;
}
