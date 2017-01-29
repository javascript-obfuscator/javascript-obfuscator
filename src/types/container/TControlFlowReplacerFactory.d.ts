import { IControlFlowReplacer } from '../../interfaces/node-transformers/IControlFlowReplacer';

import { ControlFlowReplacers } from '../../enums/container/ControlFlowReplacers';

export type TControlFlowReplacerFactory = (replacer: ControlFlowReplacers) => IControlFlowReplacer;
