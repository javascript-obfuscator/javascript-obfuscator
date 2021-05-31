import { TIdentifierNamesCacheDictionary } from './TIdentifierNamesCacheDictionary';

export type TIdentifierNamesCache = {
    globalIdentifiers?: TIdentifierNamesCacheDictionary;
    propertyIdentifiers?: TIdentifierNamesCacheDictionary;
} | null;

