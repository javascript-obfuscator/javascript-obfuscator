import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { CodeTransformationStage } from '../../enums/code-transformers/CodeTransformationStage';

import { AbstractCodeTransformer } from '../AbstractCodeTransformer';

@injectable()
export class HashbangOperatorTransformer extends AbstractCodeTransformer {
    /**
     * @type {string | null}
     */
    private hashbangOperatorLine: string | null = null;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * Removes hashbang operator before AST transformation and appends it back after
     *
     * @param {string} code
     * @param {CodeTransformationStage} codeTransformationStage
     * @returns {string}
     */
    public transformCode (code: string, codeTransformationStage: CodeTransformationStage): string {
        switch (codeTransformationStage) {
            case CodeTransformationStage.PreparingTransformers:
                return this.removeAndSaveHashbangOperatorLine(code);

            case CodeTransformationStage.FinalizingTransformers:
                return this.appendSavedHashbangOperatorLine(code);

            default:
                return code;
        }
    }

    /**
     * @param {string} code
     * @returns {string}
     */
    private removeAndSaveHashbangOperatorLine (code: string): string {
        return code
            .replace(/^#!.*$(\r?\n)*/m, (substring: string) => {
                if (substring) {
                    this.hashbangOperatorLine = substring;
                }

                return '';
            })
            .trim();
    }

    /**
     * @param {string} code
     * @returns {string}
     */
    private appendSavedHashbangOperatorLine (code: string): string {
        return `${this.hashbangOperatorLine ?? ''}${code}`;
    }
}
