import { IControlFlowReplacer } from '../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';

import { ControlFlowReplacers } from '../../enums/container/ControlFlowReplacers';

export type TControlFlowReplacerFactory = (replacer: ControlFlowReplacers) => IControlFlowReplacer;
