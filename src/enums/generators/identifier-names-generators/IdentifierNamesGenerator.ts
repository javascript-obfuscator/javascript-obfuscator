import { MakeEnum } from '../../../utils/TsEnum';

export const IdentifierNamesGenerator: Readonly<{
    DictionaryIdentifierNamesGenerator: 'dictionary';
    HexadecimalIdentifierNamesGenerator: 'hexadecimal';
    MangledIdentifierNamesGenerator: 'mangled';
    MangledShuffledIdentifierNamesGenerator: 'mangled-shuffled';
}> = MakeEnum({
    DictionaryIdentifierNamesGenerator: 'dictionary',
    HexadecimalIdentifierNamesGenerator: 'hexadecimal',
    MangledIdentifierNamesGenerator: 'mangled',
    MangledShuffledIdentifierNamesGenerator: 'mangled-shuffled'
});
