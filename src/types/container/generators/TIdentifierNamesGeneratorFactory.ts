import { IIdentifierNamesGenerator } from '../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../../interfaces/options/IOptions';

export type TIdentifierNamesGeneratorFactory = (options: IOptions) => IIdentifierNamesGenerator;
