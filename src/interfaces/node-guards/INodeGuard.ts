import { TNodeGuard } from '../../types/node/TNodeGuard';

export interface INodeGuard {
    /**
     * @param {Node} node
     * @returns {boolean}
     */
    check: TNodeGuard;
}
