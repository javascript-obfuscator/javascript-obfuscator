import * as ESTree from 'estree';

export interface IStringArrayIndexNode {
    getNode: (index: number) => ESTree.Expression;
}
