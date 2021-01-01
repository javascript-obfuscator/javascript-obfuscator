import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IArrayUtils } from '../../../interfaces/utils/IArrayUtils';
import { ICryptUtils } from '../../../interfaces/utils/ICryptUtils';
import { ICryptUtilsStringArray } from '../../../interfaces/utils/ICryptUtilsStringArray';
import { IEscapeSequenceEncoder } from '../../../interfaces/utils/IEscapeSequenceEncoder';
import { ILevelledTopologicalSorter } from '../../../interfaces/utils/ILevelledTopologicalSorter';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ArrayUtils } from '../../../utils/ArrayUtils';
import { CryptUtils } from '../../../utils/CryptUtils';
import { CryptUtilsStringArray } from '../../../utils/CryptUtilsStringArray';
import { EscapeSequenceEncoder } from '../../../utils/EscapeSequenceEncoder';
import { LevelledTopologicalSorter } from '../../../utils/LevelledTopologicalSorter';
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

    // crypt utils for string array
    bind<ICryptUtilsStringArray>(ServiceIdentifiers.ICryptUtilsStringArray)
        .to(CryptUtilsStringArray)
        .inSingletonScope();

    // escape sequence encoder
    bind<IEscapeSequenceEncoder>(ServiceIdentifiers.IEscapeSequenceEncoder)
        .to(EscapeSequenceEncoder)
        .inSingletonScope();

    // levelled topological sorter
    bind<ILevelledTopologicalSorter>(ServiceIdentifiers.ILevelledTopologicalSorter)
        .to(LevelledTopologicalSorter);
});
