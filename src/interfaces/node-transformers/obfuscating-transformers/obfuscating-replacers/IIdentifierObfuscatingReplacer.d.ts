import * as ESTree from 'estree';

import { TNodeWithBlockScope } from '../../../../types/node/TNodeWithBlockScope';

import { IObfuscatingReplacer } from './IObfuscatingReplacer';

export interface IIdentifierObfuscatingReplacer extends IObfuscatingReplacer <ESTree.Identifier> {
    /**
     * @param {string} nodeValue
     * @param {TNodeWithBlockScope} blockScopeNode
     */
    storeGlobalName (nodeValue: string, blockScopeNode: TNodeWithBlockScope): void;

    /**
     * @param {string} nodeValue
     * @param {TNodeWithBlockScope} blockScopeNode
     */
    storeLocalName (nodeValue: string, blockScopeNode: TNodeWithBlockScope): void;
}
