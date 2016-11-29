import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/INodeTransformer';

import { NodeTransformers } from '../../../enums/container/NodeTransformers';

import { FunctionControlFlowTransformer } from '../../../node-transformers/node-control-flow-transformers/FunctionControlFlowTransformer';

import { CatchClauseObfuscator } from '../../../node-transformers/node-obfuscators/CatchClauseObfuscator';
import { FunctionDeclarationObfuscator } from '../../../node-transformers/node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from '../../../node-transformers/node-obfuscators/FunctionObfuscator';
import { LabeledStatementObfuscator } from '../../../node-transformers/node-obfuscators/LabeledStatementObfuscator';
import { LiteralObfuscator } from '../../../node-transformers/node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from '../../../node-transformers/node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from '../../../node-transformers/node-obfuscators/MethodDefinitionObfuscator';
import { ObjectExpressionObfuscator } from '../../../node-transformers/node-obfuscators/ObjectExpressionObfuscator';
import { VariableDeclarationObfuscator } from '../../../node-transformers/node-obfuscators/VariableDeclarationObfuscator';

export const nodeTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    const nodeTransformersTag: string = 'nodeTransformers';

    // node control flow transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionControlFlowTransformer)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.FunctionControlFlowTransformer);

    // node obfuscators
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(CatchClauseObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.CatchClauseObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionDeclarationObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.FunctionDeclarationObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.FunctionObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LabeledStatementObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.LabeledStatementObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LiteralObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.LiteralObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.MemberExpressionObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MethodDefinitionObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.MethodDefinitionObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.ObjectExpressionObfuscator);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(VariableDeclarationObfuscator)
        .whenTargetTagged(nodeTransformersTag, NodeTransformers.VariableDeclarationObfuscator);

    // node transformers factory
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
                            nodeTransformersTag,
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
