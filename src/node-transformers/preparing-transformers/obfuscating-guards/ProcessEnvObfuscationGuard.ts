import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';

import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';

import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class ProcessEnvObfuscationGuard implements IObfuscatingGuard {
    /**
     * @param {Node} node
     * @return {boolean}
     * @private
     */
    private static isProcessEnvMemberExpression(node: ESTree.Node): boolean {
        if (!NodeGuards.isMemberExpressionNode(node)) {
            return false;
        }

        return (
            NodeGuards.isIdentifierNode(node.object) &&
            node.object.name === 'process' &&
            NodeGuards.isIdentifierNode(node.property) &&
            node.property.name === 'env' &&
            !node.computed
        );
    }

    /**
     * @param {Node} node
     * @return {boolean}
     * @private
     */
    private static isPartOfProcessEnvChain(node: ESTree.Node): boolean {
        if (ProcessEnvObfuscationGuard.isProcessEnvMemberExpression(node)) {
            return true;
        }

        const parentNode = node.parentNode;

        if (parentNode && NodeGuards.isMemberExpressionNode(parentNode)) {
            if (ProcessEnvObfuscationGuard.isProcessEnvMemberExpression(parentNode.object)) {
                return true;
            }

            if (ProcessEnvObfuscationGuard.isProcessEnvMemberExpression(parentNode)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {Node} node
     * @returns {ObfuscatingGuardResult}
     */
    public check(node: ESTree.Node): ObfuscatingGuardResult {
        return ProcessEnvObfuscationGuard.isPartOfProcessEnvChain(node)
            ? ObfuscatingGuardResult.Ignore
            : ObfuscatingGuardResult.Transform;
    }
}
