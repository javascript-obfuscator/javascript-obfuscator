import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';

import { ControlFlowReplacer } from '../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer';

export type TControlFlowReplacerFactory = (replacer: ControlFlowReplacer) => IControlFlowReplacer;
