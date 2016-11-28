import { Utils } from '../Utils';

export const NodeTransformers: any = Utils.strEnumify({
    FunctionControlFlowTransformer: 'FunctionControlFlowTransformer',
    CatchClauseObfuscator: 'CatchClauseObfuscator',
    FunctionDeclarationObfuscator: 'FunctionDeclarationObfuscator',
    FunctionObfuscator: 'FunctionObfuscator',
    LabeledStatementObfuscator: 'LabeledStatementObfuscator',
    LiteralObfuscator: 'LiteralObfuscator',
    MemberExpressionObfuscator: 'MemberExpressionObfuscator',
    MethodDefinitionObfuscator: 'MethodDefinitionObfuscator',
    ObjectExpressionObfuscator: 'ObjectExpressionObfuscator',
    VariableDeclarationObfuscator: 'VariableDeclarationObfuscator'
});
