import * as ESTree from 'estree';

import { IObfuscatingReplacer } from './IObfuscatingReplacer';

export interface IIdentifierObfuscatingReplacer extends IObfuscatingReplacer <ESTree.Identifier> {
    /**
     * @param {string} nodeValue
     * @param isGlobalDeclaration
     * @param {number} nodeIdentifier
     */
    storeNames (nodeValue: string, isGlobalDeclaration: boolean, nodeIdentifier: number): void;
}
