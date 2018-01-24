import * as ESTree from 'estree';

import { IObfuscatingReplacer } from './IObfuscatingReplacer';

export interface IIdentifierObfuscatingReplacer extends IObfuscatingReplacer <ESTree.Identifier> {
    /**
     * @param {string} nodeValue
     * @param {number} nodeIdentifier
     */
    storeGlobalName (nodeValue: string, nodeIdentifier: number): void;

    /**
     * @param {string} nodeValue
     * @param {number} nodeIdentifier
     */
    storeLocalName (nodeValue: string, nodeIdentifier: number): void;
}
