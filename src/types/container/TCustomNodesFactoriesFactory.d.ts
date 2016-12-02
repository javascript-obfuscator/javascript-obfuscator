import { ICustomNodesFactory } from '../../interfaces/custom-nodes/ICustomNodesFactory';

import { CustomNodesFactories } from '../../enums/container/CustomNodesFactories';

export type TCustomNodesFactoriesFactory = (customNodesFactoryName: CustomNodesFactories) => ICustomNodesFactory;
