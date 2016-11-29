import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../ServiceIdentifiers';

import { INodeTransformer } from '../../interfaces/INodeTransformer';

import { NodeTransformers } from '../../enums/NodeTransformers';

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
    const tag: string = 'nodeTransformer';

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionControlFlowTransformer)
        .whenTargetTagged(tag, NodeTransformers.FunctionControlFlowTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(CatchClauseObfuscator)
        .whenTargetTagged(tag, NodeTransformers.CatchClauseObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionDeclarationObfuscator)
        .whenTargetTagged(tag, NodeTransformers.FunctionDeclarationObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionObfuscator)
        .whenTargetTagged(tag, NodeTransformers.FunctionObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LabeledStatementObfuscator)
        .whenTargetTagged(tag, NodeTransformers.LabeledStatementObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LiteralObfuscator)
        .whenTargetTagged(tag, NodeTransformers.LiteralObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionObfuscator)
        .whenTargetTagged(tag, NodeTransformers.MemberExpressionObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MethodDefinitionObfuscator)
        .whenTargetTagged(tag, NodeTransformers.MethodDefinitionObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionObfuscator)
        .whenTargetTagged(tag, NodeTransformers.ObjectExpressionObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(VariableDeclarationObfuscator)
        .whenTargetTagged(tag, NodeTransformers.VariableDeclarationObfuscator);

    bind<INodeTransformer[]>(ServiceIdentifiers['Factory<INodeTransformer[]>'])
        .toFactory<INodeTransformer[]>((context: interfaces.Context) => {
            const cache: Map <NodeTransformers, INodeTransformer> = new Map <NodeTransformers, INodeTransformer> ();

            return (nodeTransformersMap: Map<string, NodeTransformers[]>) => (nodeType: string) => {
                const nodeTransformers: NodeTransformers[] = nodeTransformersMap.get(nodeType) || [];
                const instancesArray: INodeTransformer[] = [];

                nodeTransformers.forEach((transformer: NodeTransformers) => {
                    let nodeTransformer: INodeTransformer;

                    if (cache.has(transformer)) {
                        nodeTransformer = <INodeTransformer>cache.get(transformer);
                    } else {
                        nodeTransformer = context.container.getTagged<INodeTransformer>(
                            ServiceIdentifiers.INodeTransformer,
                            tag,
                            transformer
                        );
                        cache.set(transformer, nodeTransformer);
                    }

                    instancesArray.push(nodeTransformer);
                });

                return instancesArray;
            };
        });
});
