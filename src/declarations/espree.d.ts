/* tslint:disable:interface-name */

declare module 'espree' {
    import * as ESTree from 'estree';

    export interface Comment {
        value: string;
    }

    export type SourceType = 'script' | 'module';

    export interface ParseOptions {
        attachComment?: boolean;
        comment?: boolean;
        ecmaFeatures?: {
            experimentalObjectRestSpread?: boolean;
            globalReturn?: boolean;
            impliedStrict?: boolean;
            jsx?: boolean;
        };
        ecmaVersion?: 3 | 5 | 6 | 7 | 8 | 9 | 2015 | 2016 | 2017 | 2018;
        loc?: boolean;
        range?: boolean;
        sourceType?: SourceType;
    }

    export function parse (code: string | Buffer, options: ParseOptions): ESTree.Program;
}
