import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { ObjectExpressionKeysTransformerCustomNode } from '../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode';

export type TObjectExpressionKeysTransformerCustomNodeFactory = (objectExpressionKeysTransformerNodeName: ObjectExpressionKeysTransformerCustomNode) => ICustomNode;
