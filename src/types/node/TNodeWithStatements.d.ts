import * as ESTree from 'estree';

export type TNodeWithStatements = ESTree.Program | ESTree.BlockStatement | ESTree.SwitchCase;
