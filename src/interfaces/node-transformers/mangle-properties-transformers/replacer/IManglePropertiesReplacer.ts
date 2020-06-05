import * as ESTree from 'estree';

export interface IManglePropertiesReplacer {
    /**
     * @param {TNode} node
     * @returns {TNode}
     */
    replace <TNode extends ESTree.Identifier | ESTree.Literal> (node: TNode): TNode;
}
