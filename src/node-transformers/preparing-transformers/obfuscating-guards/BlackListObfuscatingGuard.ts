import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';

import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';

import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class BlackListObfuscatingGuard implements IObfuscatingGuard {
    /**
     * @type {((node: Node) => boolean)[]}
     */
    private static readonly blackListGuards: ((node: ESTree.Node) => boolean)[] = [
        NodeGuards.isDirectiveNode
    ];

    /**
     * @type {number}
     */
    private readonly blackListGuardsLength: number;

    public constructor () {
        this.blackListGuardsLength = BlackListObfuscatingGuard.blackListGuards.length;
    }

    /**
     * @param {Node} node
     * @returns {ObfuscatingGuardResult}
     */
    public check (node: ESTree.Node): ObfuscatingGuardResult {
        for (let i: number = 0; i < this.blackListGuardsLength; i++) {
            if (BlackListObfuscatingGuard.blackListGuards[i](node)) {
                return ObfuscatingGuardResult.Ignore;
            }
        }

        return ObfuscatingGuardResult.Transform;
    }
}
