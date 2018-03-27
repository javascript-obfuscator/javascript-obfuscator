import * as ESTree from 'estree';

export type TReplaceableIdentifiers = Map <ESTree.Node, Map <string, ESTree.Identifier[]>>;
