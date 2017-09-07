import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

export interface IVisitor {
    enter?: (node: ESTree.Node, parentNode: ESTree.Node | null) => ESTree.Node | estraverse.VisitorOption | void;
    leave?: (node: ESTree.Node, parentNode: ESTree.Node | null) => ESTree.Node | estraverse.VisitorOption | void;
}
