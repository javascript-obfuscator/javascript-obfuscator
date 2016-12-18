import { IGeneratorOutput } from '../interfaces/IGeneratorOutput';

declare module 'escodegen' {
    /**
     * @param ast
     * @param options
     * @returns IGeneratorOutput
     */
    export function generate(ast: any, options?: GenerateOptions): IGeneratorOutput;
}
