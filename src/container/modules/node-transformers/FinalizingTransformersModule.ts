import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { DirectivePlacementTransformer } from '../../../node-transformers/finalizing-transformers/DirectivePlacementTransformer';
import { EscapeSequenceTransformer } from '../../../node-transformers/finalizing-transformers/EscapeSequenceTransformer';

export const finalizingTransformersModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // finalizing transformers
    options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(DirectivePlacementTransformer)
        .whenNamed(NodeTransformer.DirectivePlacementTransformer);

    options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(EscapeSequenceTransformer)
        .whenNamed(NodeTransformer.EscapeSequenceTransformer);
});
