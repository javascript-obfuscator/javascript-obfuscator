import { TNodeWithStatements } from '../node/TNodeWithStatements';

import { ICallsGraphData } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

export type TCustomCodeHelpersGroupAppendMethods = {
    /**
     * @param nodeWithStatements
     * @param callsGraphData
     */
    [key in `appendOn${Capitalize<NodeTransformationStage>}`]?: (
        nodeWithStatements: TNodeWithStatements,
        callsGraphData: ICallsGraphData[]
    ) => void;
};
