import { TNodeGuard } from '../../../../types/node/TNodeGuard';

export interface IObfuscatingGuard {
    /**
     * @param {Node} node
     * @returns {boolean}
     */
    check: TNodeGuard;
}
