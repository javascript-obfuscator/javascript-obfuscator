import { injectable, injectFromBase } from 'inversify';

import { INodeTransformer } from '../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../enums/node-transformers/NodeTransformer';

import { AbstractTransformerNamesGroupsBuilder } from '../utils/AbstractTransformerNamesGroupsBuilder';

@injectFromBase()
@injectable()
export class NodeTransformerNamesGroupsBuilder extends AbstractTransformerNamesGroupsBuilder<
    NodeTransformer,
    INodeTransformer
> {}
