import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

export type TVisitorResult = ESTree.Node | estraverse.VisitorOption | void;
