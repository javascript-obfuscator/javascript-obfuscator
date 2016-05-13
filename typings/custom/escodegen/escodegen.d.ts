declare namespace escodegen {
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

    function generate(ast: any, opts?: GenerateOpts): string;
}

declare module "escodegen" {
    export = escodegen;
}