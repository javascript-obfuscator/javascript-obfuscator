import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { StringArrayRotateFunctionTransformer } from '../../../node-transformers/string-array-transformers/StringArrayRotateFunctionTransformer';
import { StringArrayScopeCallsWrapperTransformer } from '../../../node-transformers/string-array-transformers/StringArrayScopeCallsWrapperTransformer';
import { StringArrayTransformer } from '../../../node-transformers/string-array-transformers/StringArrayTransformer';

export const stringArrayTransformersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // strings transformers
        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(StringArrayRotateFunctionTransformer)
            .whenNamed(NodeTransformer.StringArrayRotateFunctionTransformer);

        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(StringArrayScopeCallsWrapperTransformer)
            .whenNamed(NodeTransformer.StringArrayScopeCallsWrapperTransformer);

        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(StringArrayTransformer)
            .whenNamed(NodeTransformer.StringArrayTransformer);
    }
);
