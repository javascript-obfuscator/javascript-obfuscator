import { IObfuscationReplacer } from './IObfuscationReplacer';

export interface IObfuscationReplacerWithStorage extends IObfuscationReplacer {
    /**
     * @param nodeValue
     * @param nodeIdentifier
     */
    storeNames (nodeValue: any, nodeIdentifier: number): void;
}
