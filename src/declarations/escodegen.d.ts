import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { IGeneratorOutput } from '../interfaces/IGeneratorOutput';

declare module 'escodegen' {
    /**
     * @param ast
     * @param options
     * @returns IGeneratorOutput
     */
    export function generate (ast: ESTree.Node, options?: escodegen.GenerateOptions): IGeneratorOutput;
}
