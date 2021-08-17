import * as ESTree from 'estree';

export type TNumberLiteralNode = ESTree.Literal & {value: number};
