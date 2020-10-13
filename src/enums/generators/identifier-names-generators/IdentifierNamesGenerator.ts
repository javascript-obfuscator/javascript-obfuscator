import { Utils } from '../../../utils/Utils';

export const IdentifierNamesGenerator: Readonly<{
    DictionaryIdentifierNamesGenerator: 'dictionary';
    HexadecimalIdentifierNamesGenerator: 'hexadecimal';
    MangledIdentifierNamesGenerator: 'mangled';
    MangledShuffledIdentifierNamesGenerator: 'mangled-shuffled';
}> = Utils.makeEnum({
    DictionaryIdentifierNamesGenerator: 'dictionary',
    HexadecimalIdentifierNamesGenerator: 'hexadecimal',
    MangledIdentifierNamesGenerator: 'mangled',
    MangledShuffledIdentifierNamesGenerator: 'mangled-shuffled'
});
