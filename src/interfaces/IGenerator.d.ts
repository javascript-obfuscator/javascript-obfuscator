import { IGeneratorOutput } from "./IGeneratorOutput";

declare module 'escodegen' {
    export function generate(ast: any, options?: GenerateOptions): IGeneratorOutput;
}
