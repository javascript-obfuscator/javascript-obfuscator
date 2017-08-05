import { TObject } from '../TObject';

import { ICLIOptions } from '../../interfaces/options/ICLIOptions';

export type TInputCLIOptions = Partial<Pick<ICLIOptions, keyof ICLIOptions>> & TObject;
