import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';

import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';

import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class ImportMetaObfuscationGuard implements IObfuscatingGuard {
    /**
     * @param {Node} node
     * @returns {ObfuscatingGuardResult}
     */
    public check(node: ESTree.Node): ObfuscatingGuardResult {
        const isMetaProperty = NodeGuards.isMetaPropertyNode(node);
        const isMetaPropertyParent = !!node?.parentNode && NodeGuards.isMetaPropertyNode(node.parentNode);

        return isMetaProperty || isMetaPropertyParent
            ? ObfuscatingGuardResult.Ignore
            : ObfuscatingGuardResult.Transform;
    }
}
