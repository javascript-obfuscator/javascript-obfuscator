import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IArrayUtils } from '../../../interfaces/utils/IArrayUtils';
import { ICryptUtils } from '../../../interfaces/utils/ICryptUtils';
import { ICryptUtilsStringArray } from '../../../interfaces/utils/ICryptUtilsStringArray';
import { IEscapeSequenceEncoder } from '../../../interfaces/utils/IEscapeSequenceEncoder';
import { ILevelledTopologicalSorter } from '../../../interfaces/utils/ILevelledTopologicalSorter';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { ISetUtils } from '../../../interfaces/utils/ISetUtils';

import { ArrayUtils } from '../../../utils/ArrayUtils';
import { CryptUtils } from '../../../utils/CryptUtils';
import { CryptUtilsStringArray } from '../../../utils/CryptUtilsStringArray';
import { EscapeSequenceEncoder } from '../../../utils/EscapeSequenceEncoder';
import { LevelledTopologicalSorter } from '../../../utils/LevelledTopologicalSorter';
import { RandomGenerator } from '../../../utils/RandomGenerator';
import { SetUtils } from '../../../utils/SetUtils';

export const utilsModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // array utils
    options.bind<IArrayUtils>(ServiceIdentifiers.IArrayUtils).to(ArrayUtils).inSingletonScope();

    // random generator
    options.bind<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator).to(RandomGenerator).inSingletonScope();

    // crypt utils
    options.bind<ICryptUtils>(ServiceIdentifiers.ICryptUtils).to(CryptUtils).inSingletonScope();

    // crypt utils for string array
    options.bind<ICryptUtilsStringArray>(ServiceIdentifiers.ICryptUtilsStringArray)
        .to(CryptUtilsStringArray)
        .inSingletonScope();

    // escape sequence encoder
    options.bind<IEscapeSequenceEncoder>(ServiceIdentifiers.IEscapeSequenceEncoder)
        .to(EscapeSequenceEncoder)
        .inSingletonScope();

    // levelled topological sorter
    options.bind<ILevelledTopologicalSorter>(ServiceIdentifiers.ILevelledTopologicalSorter).to(LevelledTopologicalSorter);

    // set utils
    options.bind<ISetUtils>(ServiceIdentifiers.ISetUtils).to(SetUtils).inSingletonScope();
});
