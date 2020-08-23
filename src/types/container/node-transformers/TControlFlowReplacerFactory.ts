import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';

import { ControlFlowReplacer } from '../../../enums/node-transformers/control-flow-transformers/control-flow-replacers/ControlFlowReplacer';

export type TControlFlowReplacerFactory = (replacer: ControlFlowReplacer) => IControlFlowReplacer;
