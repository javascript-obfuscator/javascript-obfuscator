import * as ESTree from 'estree';

import { IObfuscatingReplacer } from './IObfuscatingReplacer';

export interface IIdentifierObfuscatingReplacer extends IObfuscatingReplacer <ESTree.Identifier> {
    /**
     * @param nodeValue
     * @param {number} nodeIdentifier
     */
    storeNames (nodeValue: any, nodeIdentifier: number): void;
}
