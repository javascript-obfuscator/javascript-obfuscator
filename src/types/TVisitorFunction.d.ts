import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

export type TVisitorFunction = (node: ESTree.Node, parentNode: ESTree.Node | null) => estraverse.VisitorOption | ESTree.Node | void;
