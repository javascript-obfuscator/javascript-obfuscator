import { inject, injectable } from 'inversify';

import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TCodeTransformerFactory } from '../types/container/code-transformers/TCodeTransformerFactory';
import { TDictionary } from '../types/TDictionary';

import { ICodeTransformer } from '../interfaces/code-transformers/ICodeTransformer';
import { ICodeTransformersRunner } from '../interfaces/code-transformers/ICodeTransformersRunner';
import { ITransformerNamesGroupsBuilder } from '../interfaces/utils/ITransformerNamesGroupsBuilder';

import { CodeTransformer } from '../enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from '../enums/code-transformers/CodeTransformationStage';

@injectable()
export class CodeTransformersRunner implements ICodeTransformersRunner {
    /**
     * @type {TCodeTransformerFactory}
     */
    private readonly codeTransformerFactory: TCodeTransformerFactory;

    /**
     * @type {ITransformerNamesGroupsBuilder}
     */
    private readonly codeTransformerNamesGroupsBuilder: ITransformerNamesGroupsBuilder<
        CodeTransformer,
        ICodeTransformer
    >;

    /**
     * @param {TNodeTransformerFactory} codeTransformerFactory
     * @param {ITransformerNamesGroupsBuilder} codeTransformerNamesGroupsBuilder
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__ICodeTransformer)
            codeTransformerFactory: TCodeTransformerFactory,
        @inject(ServiceIdentifiers.ICodeTransformerNamesGroupsBuilder)
            codeTransformerNamesGroupsBuilder: ITransformerNamesGroupsBuilder<
                CodeTransformer,
                ICodeTransformer
            >,
    ) {
        this.codeTransformerFactory = codeTransformerFactory;
        this.codeTransformerNamesGroupsBuilder = codeTransformerNamesGroupsBuilder;
    }

    /**
     * @param {string} code
     * @param {CodeTransformer[]} codeTransformerNames
     * @param {CodeTransformationStage} codeTransformationStage
     * @returns {string}
     */
    public transform (
        code: string,
        codeTransformerNames: CodeTransformer[],
        codeTransformationStage: CodeTransformationStage
    ): string {
        if (!codeTransformerNames.length) {
            return code;
        }

        const normalizedCodeTransformers: TDictionary<ICodeTransformer> =
            this.buildNormalizedCodeTransformers(codeTransformerNames, codeTransformationStage);
        const codeTransformerNamesGroups: CodeTransformer[][] =
            this.codeTransformerNamesGroupsBuilder.build(normalizedCodeTransformers);

        for (const nodeTransformerNamesGroup of codeTransformerNamesGroups) {
            for (const nodeTransformerName of nodeTransformerNamesGroup) {
                const codeTransformer: ICodeTransformer = normalizedCodeTransformers[nodeTransformerName];

                code = codeTransformer.transformCode(code, codeTransformationStage);
            }
        }

        return code;
    }

    /**
     * @param {NodeTransformer[]} codeTransformerNames
     * @param {NodeTransformationStage} codeTransformationStage
     * @returns {TDictionary<INodeTransformer>}
     */
    private buildNormalizedCodeTransformers (
        codeTransformerNames: CodeTransformer[],
        codeTransformationStage: CodeTransformationStage
    ): TDictionary<ICodeTransformer> {
        return codeTransformerNames
            .reduce<TDictionary<ICodeTransformer>>(
                (acc: TDictionary<ICodeTransformer>, codeTransformerName: CodeTransformer) => {
                    const codeTransformer: ICodeTransformer = this.codeTransformerFactory(codeTransformerName);

                    return {
                        ...acc,
                        [codeTransformerName]: codeTransformer
                    };
                },
                {}
            );
    }
}
