import { TDictionary } from '../TDictionary';
import { TInputOptionsPreset } from './TInputOptionsPreset';

import { IOptions } from '../../interfaces/options/IOptions';

export type TInputOptions = Partial<Omit<IOptions, 'optionsPreset'>> & {
    optionsPreset?: TInputOptionsPreset;
} & TDictionary;
