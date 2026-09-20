import { TDictionary } from '../TDictionary';
import { TInputOptionsPreset } from './TInputOptionsPreset';

import { ICLIOptions } from '../../interfaces/options/ICLIOptions';

export type TInputCLIOptions = Partial<Omit<ICLIOptions, 'optionsPreset'>> & {
    optionsPreset?: TInputOptionsPreset;
} & TDictionary;
