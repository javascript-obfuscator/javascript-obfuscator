import { ITransformer } from '../ITransformer';

import { CodeTransformer } from '../../enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from '../../enums/code-transformers/CodeTransformationStage';

export interface ICodeTransformer extends ITransformer <CodeTransformer> {
    /**
     * @param {string} code
     * @param {CodeTransformationStage} codeTransformationStage
     * @returns {string}
     */
    transformCode (code: string, codeTransformationStage: CodeTransformationStage): string;
}
