import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IArrayUtils } from '../../../interfaces/utils/IArrayUtils';
import { ICryptUtils } from '../../../interfaces/utils/ICryptUtils';
import { IEscapeSequenceEncoder } from '../../../interfaces/utils/IEscapeSequenceEncoder';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ArrayUtils } from '../../../utils/ArrayUtils';
import { CryptUtils } from '../../../utils/CryptUtils';
import { EscapeSequenceEncoder } from '../../../utils/EscapeSequenceEncoder';
import { RandomGenerator } from '../../../utils/RandomGenerator';

export const utilsModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // array utils
    bind<IArrayUtils>(ServiceIdentifiers.IArrayUtils)
        .to(ArrayUtils)
        .inSingletonScope();

    // random generator
    bind<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator)
        .to(RandomGenerator)
        .inSingletonScope();

    // crypt utils
    bind<ICryptUtils>(ServiceIdentifiers.ICryptUtils)
        .to(CryptUtils)
        .inSingletonScope();

    // escape sequence encoder
    bind<IEscapeSequenceEncoder>(ServiceIdentifiers.IEscapeSequenceEncoder)
        .to(EscapeSequenceEncoder)
        .inSingletonScope();
});
