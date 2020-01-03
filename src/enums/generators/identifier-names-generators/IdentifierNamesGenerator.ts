import { MakeEnum } from '@gradecam/tsenum';

export const IdentifierNamesGenerator: Readonly<{
    MangledIdentifierNamesGenerator: string;
    DictionaryIdentifierNamesGenerator: string;
    HexadecimalIdentifierNamesGenerator: string;
}> = MakeEnum({
    DictionaryIdentifierNamesGenerator: 'dictionary',
    HexadecimalIdentifierNamesGenerator: 'hexadecimal',
    MangledIdentifierNamesGenerator: 'mangled'
});
