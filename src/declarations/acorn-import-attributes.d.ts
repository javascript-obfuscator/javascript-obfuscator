declare module 'acorn-import-attributes' {
    import { Parser } from 'acorn';

    type TParserExtension = (BaseParser: typeof Parser) => typeof Parser;

    export const importAttributes: TParserExtension;
    export const importAssertions: TParserExtension;
    export const importAttributesOrAssertions: TParserExtension;
}
