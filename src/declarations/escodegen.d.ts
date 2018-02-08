/* tslint:disable:interface-name */

import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { IGeneratorOutput } from '../interfaces/IGeneratorOutput';

declare module 'escodegen' {
    export interface XVerbatimProperty {
        content?: string;
        precedence: escodegen.Precedence;
    }

    /**
     * @param ast
     * @param options
     * @returns IGeneratorOutput
     */
    export function generate (ast: ESTree.Node, options?: escodegen.GenerateOptions): IGeneratorOutput;
}
