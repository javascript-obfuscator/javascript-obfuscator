import * as ESTree from 'estree';

export type TNodeWithSingleStatementBody = (
    ESTree.LabeledStatement
    | ESTree.WithStatement
    | ESTree.WhileStatement
    | ESTree.DoWhileStatement
    | ESTree.ForStatement
    | ESTree.ForInStatement
    | ESTree.ForOfStatement
    & {
        body: Exclude<ESTree.Statement, ESTree.BlockStatement>;
    }
)
| (
    ESTree.IfStatement
    & {
        consequent: Exclude<ESTree.Statement, ESTree.BlockStatement>;
        alternate?: Exclude<ESTree.Statement, ESTree.BlockStatement> | null;
    }
);
