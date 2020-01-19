declare module 'acorn-import-meta' {
    import * as acorn from 'acorn';

    function acornImportMeta (BaseParser: typeof acorn.Parser): typeof acorn.Parser;

    export = acornImportMeta;
}
