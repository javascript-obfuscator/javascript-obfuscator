import { ContainerModule, interfaces } from 'inversify';

import { INodeTransformer } from '../../interfaces/INodeTransformer';

import { FunctionControlFlowTransformer } from '../../node-transformers/node-control-flow-transformers/FunctionControlFlowTransformer';

export const nodeControlFlowTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<INodeTransformer>('INodeTransformer')
        .to(FunctionControlFlowTransformer)
        .inSingletonScope()
        .whenTargetNamed('FunctionControlFlowTransformer');
});
