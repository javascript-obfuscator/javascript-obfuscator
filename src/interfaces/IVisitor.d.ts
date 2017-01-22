import * as ESTree from 'estree';

export interface IVisitor {
    enter?: (node: ESTree.Node, parentNode: ESTree.Node | null) => ESTree.Node | void;
    leave?: (node: ESTree.Node, parentNode: ESTree.Node | null) => ESTree.Node | void;
}
