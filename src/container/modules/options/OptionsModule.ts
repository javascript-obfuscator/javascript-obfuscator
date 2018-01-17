import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IOptionsNormalizer } from '../../../interfaces/options/IOptionsNormalizer';

import { Options } from '../../../options/Options';
import { OptionsNormalizer } from '../../../options/OptionsNormalizer';

export const optionsModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IOptions>(ServiceIdentifiers.IOptions)
        .to(Options)
        .inSingletonScope();

    bind<IOptionsNormalizer>(ServiceIdentifiers.IOptionsNormalizer)
        .to(OptionsNormalizer)
        .inSingletonScope();
});
