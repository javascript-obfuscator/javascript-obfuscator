import * as ESTree from 'estree';

export interface INode extends ESTree.BaseNode {
    parentNode?: ESTree.Node;
}
