import * as ESTree from 'estree';

export type TNodeGuard = (node: ESTree.Node) => boolean;
