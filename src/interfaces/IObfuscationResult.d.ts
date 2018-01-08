import * as ESTree from 'estree';

import { IInitializable } from './IInitializable';

export interface IObfuscationResult extends IInitializable {
    /**
     * @return {string}
     */
    getObfuscatedAst (): ESTree.Program;

    /**
     * @return {string}
     */
    getObfuscatedCode (): string;

    /**
     * @return {string}
     */
    getSourceMap (): string;
}
