import * as ESTree from 'estree';

export interface INodeTransformer {
    transformNode (node: ESTree.Node, parentNode?: ESTree.Node): void;
}
