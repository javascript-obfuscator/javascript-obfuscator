import * as ESTree from 'estree';

import { TNodeWithBlockScope } from '../../../../types/node/TNodeWithBlockScope';

import { IObfuscatingReplacer } from './IObfuscatingReplacer';

export interface IIdentifierObfuscatingReplacer extends IObfuscatingReplacer <ESTree.Identifier> {
    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithBlockScope} blockScopeNode
     */
    storeGlobalName (identifierNode: ESTree.Identifier, blockScopeNode: TNodeWithBlockScope): void;

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithBlockScope} blockScopeNode
     */
    storeLocalName (identifierNode: ESTree.Identifier, blockScopeNode: TNodeWithBlockScope): void;
}
