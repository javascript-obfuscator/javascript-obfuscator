import { IDeadCodeInjectionReplacer } from '../../interfaces/node-transformers/IDeadCodeInjectionReplacer';

import { DeadCodeInjectionReplacers } from '../../enums/container/DeadCodeInjectionReplacers';

export type TDeadCodeInjectionReplacerFactory = (replacer: DeadCodeInjectionReplacers) => IDeadCodeInjectionReplacer;
