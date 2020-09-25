import { TObfuscatingGuard } from '../../../../types/node/TObfuscatingGuard';

export interface IObfuscatingGuard {
    /**
     * @param {Node} node
     * @returns {boolean}
     */
    check: TObfuscatingGuard;
}
