import * as ESTree from 'estree';

import { IObfuscatingReplacer } from './IObfuscatingReplacer';

export interface IIdentifierReplacer extends IObfuscatingReplacer <ESTree.Identifier> {
    /**
     * @param nodeValue
     * @param nodeIdentifier
     */
    storeNames (nodeValue: any, nodeIdentifier: number): void;
}
