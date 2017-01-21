import * as ESTree from 'estree';

export type TVisitorFunction = (node: ESTree.Node, parentNode: ESTree.Node | null) => ESTree.Node | void;
