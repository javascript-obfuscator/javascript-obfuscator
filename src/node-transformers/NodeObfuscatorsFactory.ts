import { TNodeTransformer } from '../types/TNodeTransformer';

import { NodeType } from '../enums/NodeType';

import { CatchClauseObfuscator } from './node-obfuscators/CatchClauseObfuscator';
import { FunctionDeclarationObfuscator } from './node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from './node-obfuscators/FunctionObfuscator';
import { LabeledStatementObfuscator } from './node-obfuscators/LabeledStatementObfuscator';
import { LiteralObfuscator } from './node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from './node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from './node-obfuscators/MethodDefinitionObfuscator';
import { ObjectExpressionObfuscator } from './node-obfuscators/ObjectExpressionObfuscator';
import { VariableDeclarationObfuscator } from './node-obfuscators/VariableDeclarationObfuscator';
import { AbstractNodeTransformersFactory } from './AbstractNodeTransformersFactory';

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
