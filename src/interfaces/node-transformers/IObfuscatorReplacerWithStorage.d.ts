import { IObfuscatorReplacer } from './IObfuscatorReplacer';

export interface IObfuscatorReplacerWithStorage extends IObfuscatorReplacer {
    /**
     * @param nodeValue
     * @param nodeIdentifier
     */
    storeNames (nodeValue: any, nodeIdentifier: string): void;
}
