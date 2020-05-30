import { TDictionary } from '../TDictionary';

import { ICLIOptions } from '../../interfaces/options/ICLIOptions';

export type TInputCLIOptions = Partial<Pick<ICLIOptions, keyof ICLIOptions>> & TDictionary;
