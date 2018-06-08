/* tslint:disable:interface-name */

import * as ESTree from 'estree';

import { IGeneratorOutput } from '../interfaces/IGeneratorOutput';

declare module 'escodegen' {
    export interface XVerbatimProperty {
        content?: string;
        precedence: Precedence;
    }

    /**
     * @param ast
     * @param options
     * @returns IGeneratorOutput
     */
    export function generate (ast: ESTree.Node, options?: GenerateOptions): IGeneratorOutput;
}
