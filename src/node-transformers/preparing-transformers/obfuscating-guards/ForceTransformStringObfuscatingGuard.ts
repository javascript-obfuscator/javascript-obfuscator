import { inject, injectable } from 'inversify';

import * as ESTree from 'estree';

import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../../interfaces/options/IOptions';

import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';

import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class ForceTransformStringObfuscatingGuard implements IObfuscatingGuard {
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
            this.options.forceTransformStrings.length
            && NodeGuards.isLiteralNode(node)
            && typeof node.value === 'string'
        ) {
            return !this.isForceTransformString(node.value)
                ? ObfuscatingGuardResult.Transform
                : ObfuscatingGuardResult.ForceTransform;
        }

        return ObfuscatingGuardResult.Transform;
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    private isForceTransformString (value: string): boolean {
        return this.options.forceTransformStrings
            .some((forceTransformString: string) => {
                return new RegExp(forceTransformString, 'g').exec(value) !== null;
            });
    }
}
