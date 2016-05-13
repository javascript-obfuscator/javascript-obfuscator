declare module 'escodegen' {
    interface GenerateOpts {
        comment?: boolean;
        format?: {
            indent?: {
                style?: string;
                base?: number;
                adjustMultilineComment: boolean;
            }
        }
    }

    export function generate(ast: any, opts?: GenerateOpts): string;
}