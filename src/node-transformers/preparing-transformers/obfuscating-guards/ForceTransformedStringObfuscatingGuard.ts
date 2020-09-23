import { inject, injectable } from 'inversify';

import * as ESTree from 'estree';

import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../../interfaces/options/IOptions';

import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';

import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class ForceTransformedStringObfuscatingGuard implements IObfuscatingGuard {
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
            this.options.forceTransformedStrings.length
            && NodeGuards.isLiteralNode(node)
            && typeof node.value === 'string'
        ) {
            return !this.isForceTransformedString(node.value)
                ? ObfuscatingGuardResult.Obfuscated
                : ObfuscatingGuardResult.ForceObfuscated;
        }

        return ObfuscatingGuardResult.Obfuscated;
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    private isForceTransformedString (value: string): boolean {
        return this.options.forceTransformedStrings
            .some((forceTransformedString: string) => {
                return new RegExp(forceTransformedString, 'g').exec(value) !== null;
            });
    }
}
