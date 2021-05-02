import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';

export type TVisitorResult = ESTree.Node | estraverse.VisitorOption | void;
