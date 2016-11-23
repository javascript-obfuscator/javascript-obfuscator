import { TNodeTransformer } from '../../../types/TNodeTransformer';

import { NodeType } from '../../../enums/NodeType';

import { CatchClauseObfuscator } from '../CatchClauseObfuscator';
import { FunctionDeclarationObfuscator } from '../FunctionDeclarationObfuscator';
import { FunctionObfuscator } from '../FunctionObfuscator';
import { LabeledStatementObfuscator } from '../LabeledStatementObfuscator';
import { LiteralObfuscator } from '../LiteralObfuscator';
import { MemberExpressionObfuscator } from '../MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from '../MethodDefinitionObfuscator';
import { ObjectExpressionObfuscator } from '../ObjectExpressionObfuscator';
import { VariableDeclarationObfuscator } from '../VariableDeclarationObfuscator';
import { AbstractNodeTransformersFactory } from '../../AbstractNodeTransformersFactory';

export class NodeObfuscatorsFactory extends AbstractNodeTransformersFactory {
    /**
     * @type {Map<string, TNodeTransformer[]>}
     */
    protected readonly nodeTransformers: Map <string, TNodeTransformer[]> = new Map <string, TNodeTransformer[]> ([
        [NodeType.ArrowFunctionExpression, [FunctionObfuscator]],
        [NodeType.ClassDeclaration, [FunctionDeclarationObfuscator]],
        [NodeType.CatchClause, [CatchClauseObfuscator]],
        [NodeType.FunctionDeclaration, [
            FunctionDeclarationObfuscator,
            FunctionObfuscator
        ]],
        [NodeType.FunctionExpression, [FunctionObfuscator]],
        [NodeType.MemberExpression, [MemberExpressionObfuscator]],
        [NodeType.MethodDefinition, [MethodDefinitionObfuscator]],
        [NodeType.ObjectExpression, [ObjectExpressionObfuscator]],
        [NodeType.VariableDeclaration, [VariableDeclarationObfuscator]],
        [NodeType.LabeledStatement, [LabeledStatementObfuscator]],
        [NodeType.Literal, [LiteralObfuscator]]
    ]);
}
