import { IControlFlowReplacer } from '../../interfaces/node-transformers/IControlFlowReplacer';

import { NodeControlFlowReplacers } from '../../enums/container/NodeControlFlowReplacers';

export type TControlFlowReplacerFactory = (replacer: NodeControlFlowReplacers) => IControlFlowReplacer;
