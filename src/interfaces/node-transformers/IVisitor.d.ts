import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

export interface IVisitor <T extends ESTree.Node = ESTree.Node> {
    enter? (node: T, parentNode: ESTree.Node | null): ESTree.Node | estraverse.VisitorOption | void;
    leave? (node: T, parentNode: ESTree.Node | null): ESTree.Node | estraverse.VisitorOption | void;
}
