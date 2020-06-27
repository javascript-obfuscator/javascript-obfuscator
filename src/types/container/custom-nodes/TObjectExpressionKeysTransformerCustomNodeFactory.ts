import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { ObjectExpressionKeysTransformerCustomNode } from '../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode';

export type TObjectExpressionKeysTransformerCustomNodeFactory = <
    TInitialData extends unknown[] = unknown[]
> (objectExpressionKeysTransformerNodeName: ObjectExpressionKeysTransformerCustomNode) => ICustomNode <TInitialData>;
