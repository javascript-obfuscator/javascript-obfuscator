import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { TNodeGuard } from '../../../types/node/TNodeGuard';

import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';

import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class BlackListObfuscatingGuard implements IObfuscatingGuard {
    /**
     * @type {((node: Node) => boolean)[]}
     */
    private static readonly blackListGuards: TNodeGuard[] = [
        NodeGuards.isUseStrictOperator
    ];

    /**
     * @type {number}
     */
    private readonly blackListGuardsLength: number;

    constructor () {
        this.blackListGuardsLength = BlackListObfuscatingGuard.blackListGuards.length;
    }

    /**
     * @returns {boolean}
     * @param node
     */
    public check (node: ESTree.Node): boolean {
        for (let i: number = 0; i < this.blackListGuardsLength; i++) {
            if (BlackListObfuscatingGuard.blackListGuards[i](node)) {
                return false;
            }
        }

        return true;
    }
}
