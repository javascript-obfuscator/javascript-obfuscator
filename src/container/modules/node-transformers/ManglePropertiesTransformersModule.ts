import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IManglePropertiesReplacer } from '../../../interfaces/node-transformers/mangle-properties-transformers/replacer/IManglePropertiesReplacer';
import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { ManglePropertiesReplacer } from '../../../node-transformers/mangle-properties-transformers/replacer/ManglePropertiesReplacer';
import { ManglePropertiesTransformer } from '../../../node-transformers/mangle-properties-transformers/ManglePropertiesTransformer';

export const manglePropertiesTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // mangle properties transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ManglePropertiesTransformer)
        .whenTargetNamed(NodeTransformer.ManglePropertiesTransformer);

    // mangle properties obfuscating replacer
    bind<IManglePropertiesReplacer>(ServiceIdentifiers.IManglePropertiesObfuscatingReplacer)
        .to(ManglePropertiesReplacer);
});
