import { CodeTransformer } from '../../enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from '../../enums/code-transformers/CodeTransformationStage';

export interface ICodeTransformersRunner {
    /**
     * @param {string} code
     * @param {CodeTransformer[]} codeTransformers
     * @param {CodeTransformationStage} codeTransformationStage
     * @returns {string}
     */
    transform (
        code: string,
        codeTransformers: CodeTransformer[],
        codeTransformationStage: CodeTransformationStage
    ): string;
}
