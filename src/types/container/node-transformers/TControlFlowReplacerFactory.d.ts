import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';

import { ControlFlowReplacers } from '../../../enums/container/node-transformers/ControlFlowReplacers';

export type TControlFlowReplacerFactory = (replacer: ControlFlowReplacers) => IControlFlowReplacer;
