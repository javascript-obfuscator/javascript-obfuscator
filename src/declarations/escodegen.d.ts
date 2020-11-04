/* eslint-disable */

declare module '@javascript-obfuscator/escodegen' {
    import * as ESTree from 'estree';
    import * as escodegen from 'escodegen';
    export * from 'escodegen';

    export interface IGeneratorOutput {
        code: string;
        map: string;
    }

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
