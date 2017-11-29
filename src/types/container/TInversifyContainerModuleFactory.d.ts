import { interfaces } from 'inversify';

import { TInputOptions } from '../options/TInputOptions';

export type TInversifyContainerModuleFactory = (options: TInputOptions) => interfaces.ContainerModule;
