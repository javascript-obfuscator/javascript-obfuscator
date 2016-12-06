import { IControlFlowReplacer } from '../../interfaces/node-transformers/IControlFlowReplacer';
import { IOptions } from '../../interfaces/options/IOptions';

export type TControlFlowReplacer = (new (options: IOptions) => IControlFlowReplacer);
