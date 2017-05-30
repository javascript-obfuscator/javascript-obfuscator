import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';

import { ControlFlowReplacer } from '../../../enums/container/node-transformers/ControlFlowReplacer';

export type TControlFlowReplacerFactory = (replacer: ControlFlowReplacer) => IControlFlowReplacer;
