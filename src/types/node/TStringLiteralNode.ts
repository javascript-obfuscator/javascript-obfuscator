import * as ESTree from 'estree';

export type TStringLiteralNode = ESTree.Literal & {value: string};
