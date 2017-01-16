import * as estraverse from 'estraverse';

export interface INodeTransformer {
    /**
     * @returns {estraverse.Visitor}
     */
    getVisitor (): estraverse.Visitor;
}
