import { inject, injectable } from 'inversify';

import * as ESTree from 'estree';

import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../../interfaces/options/IOptions';

import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';

import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class IgnoredImportObfuscatingGuard implements IObfuscatingGuard {
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
     * @returns {boolean}
     */
    private static isDynamicImport (node: ESTree.Node): boolean {
        return NodeGuards.isImportExpressionNode(node);
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private static isRequireImport (node: ESTree.Node): boolean {
        return NodeGuards.isCallExpressionNode(node)
            && NodeGuards.isIdentifierNode(node.callee)
            && node.callee.name === 'require';
    }

    /**
     * @param {Node} node
     * @returns {ObfuscatingGuardResult}
     */
    public check (node: ESTree.Node): ObfuscatingGuardResult {
        if (this.options.ignoreImports) {
            const isIgnoredImport = IgnoredImportObfuscatingGuard.isDynamicImport(node)
                || IgnoredImportObfuscatingGuard.isRequireImport(node);

            if (isIgnoredImport) {
                return ObfuscatingGuardResult.Ignore;
            }
        }

        return ObfuscatingGuardResult.Transform;
    }
}
