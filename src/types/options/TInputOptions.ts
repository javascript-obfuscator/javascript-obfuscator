import { TObject } from '../TObject';

import { IOptions } from '../../interfaces/options/IOptions';

export type TInputOptions = Partial<Pick<IOptions, keyof IOptions>> & TObject;
