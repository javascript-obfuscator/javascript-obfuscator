import { ContainerModule, interfaces } from 'inversify';

import { INodeTransformer } from '../../interfaces/INodeTransformer';

import { CatchClauseObfuscator } from '../../node-transformers/node-obfuscators/CatchClauseObfuscator';
import { FunctionDeclarationObfuscator } from '../../node-transformers/node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from '../../node-transformers/node-obfuscators/FunctionObfuscator';
import { LabeledStatementObfuscator } from '../../node-transformers/node-obfuscators/LabeledStatementObfuscator';
import { LiteralObfuscator } from '../../node-transformers/node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from '../../node-transformers/node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from '../../node-transformers/node-obfuscators/MethodDefinitionObfuscator';
import { ObjectExpressionObfuscator } from '../../node-transformers/node-obfuscators/ObjectExpressionObfuscator';
import { VariableDeclarationObfuscator } from '../../node-transformers/node-obfuscators/VariableDeclarationObfuscator';

export const nodeObfuscatorsModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<INodeTransformer>('INodeTransformer')
        .to(CatchClauseObfuscator)
        .whenTargetNamed('CatchClauseObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(FunctionDeclarationObfuscator)
        .whenTargetNamed('FunctionDeclarationObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(FunctionObfuscator)
        .whenTargetNamed('FunctionObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(LabeledStatementObfuscator)
        .whenTargetNamed('LabeledStatementObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(LiteralObfuscator)
        .whenTargetNamed('LiteralObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(MemberExpressionObfuscator)
        .whenTargetNamed('MemberExpressionObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(MethodDefinitionObfuscator)
        .whenTargetNamed('MethodDefinitionObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(ObjectExpressionObfuscator)
        .whenTargetNamed('ObjectExpressionObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(VariableDeclarationObfuscator)
        .whenTargetNamed('VariableDeclarationObfuscator');
});
