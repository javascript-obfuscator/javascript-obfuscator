import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { TNodeGuard } from '../types/node/TNodeGuard';

import { INodeGuard } from '../interfaces/node-guards/INodeGuard';

import { Node } from '../node/Node';

@injectable()
export class BlackListNodeGuard implements INodeGuard {
    /**
     * @type {((node: Node) => boolean)[]}
     */
    private static readonly blackListGuards: TNodeGuard[] = [
        Node.isUseStrictOperator
    ];

    /**
     * @type {number}
     */
    private readonly blackListGuardsLength: number;

    constructor () {
        this.blackListGuardsLength = BlackListNodeGuard.blackListGuards.length;
    }

    /**
     * @returns {boolean}
     * @param node
     */
    public check (node: ESTree.Node): boolean {
        for (let i: number = 0; i < this.blackListGuardsLength; i++) {
            if (BlackListNodeGuard.blackListGuards[i](node)) {
                return false;
            }
        }

        return true;
    }
}
