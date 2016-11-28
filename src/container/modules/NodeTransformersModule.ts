import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../ServiceIdentifiers';

import { INodeTransformer } from '../../interfaces/INodeTransformer';

import { FunctionControlFlowTransformer } from '../../node-transformers/node-control-flow-transformers/FunctionControlFlowTransformer';

import { CatchClauseObfuscator } from '../../node-transformers/node-obfuscators/CatchClauseObfuscator';
import { FunctionDeclarationObfuscator } from '../../node-transformers/node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from '../../node-transformers/node-obfuscators/FunctionObfuscator';
import { LabeledStatementObfuscator } from '../../node-transformers/node-obfuscators/LabeledStatementObfuscator';
import { LiteralObfuscator } from '../../node-transformers/node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from '../../node-transformers/node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from '../../node-transformers/node-obfuscators/MethodDefinitionObfuscator';
import { ObjectExpressionObfuscator } from '../../node-transformers/node-obfuscators/ObjectExpressionObfuscator';
import { VariableDeclarationObfuscator } from '../../node-transformers/node-obfuscators/VariableDeclarationObfuscator';

export const nodeTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<INodeTransformer>('INodeTransformer')
        .to(FunctionControlFlowTransformer)
        .inSingletonScope()
        .whenTargetNamed('FunctionControlFlowTransformer');

    bind<INodeTransformer>('INodeTransformer')
        .to(CatchClauseObfuscator)
        .inSingletonScope()
        .whenTargetNamed('CatchClauseObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(FunctionDeclarationObfuscator)
        .inSingletonScope()
        .whenTargetNamed('FunctionDeclarationObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(FunctionObfuscator)
        .inSingletonScope()
        .whenTargetNamed('FunctionObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(LabeledStatementObfuscator)
        .inSingletonScope()
        .whenTargetNamed('LabeledStatementObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(LiteralObfuscator)
        .inSingletonScope()
        .whenTargetNamed('LiteralObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(MemberExpressionObfuscator)
        .inSingletonScope()
        .whenTargetNamed('MemberExpressionObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(MethodDefinitionObfuscator)
        .inSingletonScope()
        .whenTargetNamed('MethodDefinitionObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(ObjectExpressionObfuscator)
        .inSingletonScope()
        .whenTargetNamed('ObjectExpressionObfuscator');

    bind<INodeTransformer>('INodeTransformer')
        .to(VariableDeclarationObfuscator)
        .inSingletonScope()
        .whenTargetNamed('VariableDeclarationObfuscator');

    bind<INodeTransformer[]>(ServiceIdentifiers['Factory<INodeTransformer[]>'])
        .toFactory<INodeTransformer[]>((context: interfaces.Context) => {
            const cache: Map <string, INodeTransformer> = new Map <string, INodeTransformer> ();

            return (nodeTransformersMap: Map<string, string[]>) => (nodeType: string) => {
                const nodeTransformers: string[] = nodeTransformersMap.get(nodeType) || [];
                const instancesArray: INodeTransformer[] = [];

                nodeTransformers.forEach((transformer: string) => {
                    let nodeTransformer: INodeTransformer;

                    if (!cache.has(transformer)) {
                        nodeTransformer = context.container.getNamed<INodeTransformer>('INodeTransformer', transformer);
                        cache.set(transformer, nodeTransformer);
                    } else {
                        nodeTransformer = <INodeTransformer>cache.get(transformer);
                    }

                    instancesArray.push(nodeTransformer);
                });

                return instancesArray;
            };
        });
});
