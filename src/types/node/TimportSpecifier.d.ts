import * as ESTree from 'estree';

export type TImportSpecifier = ESTree.ImportSpecifier
    | ESTree.ImportDefaultSpecifier
    | ESTree.ImportNamespaceSpecifier;
