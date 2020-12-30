import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

export type TCustomCodeHelpersGroupAppendMethodName = `appendOn${Capitalize<NodeTransformationStage>}Stage`;
