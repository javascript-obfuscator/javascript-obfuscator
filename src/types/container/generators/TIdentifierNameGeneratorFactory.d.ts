import { IIdentifierNameGenerator } from '../../../interfaces/generators/identifier-name-generators/IIdentifierNameGenerator';
import { IOptions } from '../../../interfaces/options/IOptions';

export type TIdentifierNameGeneratorFactory = (options: IOptions) => IIdentifierNameGenerator;
