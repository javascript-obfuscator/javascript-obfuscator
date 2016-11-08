import * as ESTree from 'estree';

export interface ICalleeData {
    callee: ESTree.BlockStatement;
    name: string | number | null;
}
