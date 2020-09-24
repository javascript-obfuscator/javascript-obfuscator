import { inject, injectable } from 'inversify';

import * as ESTree from 'estree';

import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../../interfaces/options/IOptions';

import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';

import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class ReservedStringObfuscatingGuard implements IObfuscatingGuard {
    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    /**
     * @param {Node} node
     * @returns {ObfuscatingGuardResult}
     */
    public check (node: ESTree.Node): ObfuscatingGuardResult {
        if (
            this.options.reservedStrings.length
            && NodeGuards.isLiteralNode(node)
            && typeof node.value === 'string'
        ) {
            return !this.isReservedString(node.value)
                ? ObfuscatingGuardResult.Transform
                : ObfuscatingGuardResult.Ignore;
        }

        return ObfuscatingGuardResult.Transform;
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    private isReservedString (value: string): boolean {
        return this.options.reservedStrings
            .some((reservedString: string) => {
                return new RegExp(reservedString, 'g').exec(value) !== null;
            });
    }
}
