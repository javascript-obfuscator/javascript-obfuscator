import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../../../interfaces/options/IOptions';

import { AbstractObfuscatingReplacer } from '../AbstractObfuscatingReplacer';
import { NodeFactory } from '../../../../node/NodeFactory';
import { NumberUtils } from '../../../../utils/NumberUtils';
import { Utils } from '../../../../utils/Utils';

@injectable()
export class NumberLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer {
    /**
     * @type {Map<string, string>}
     */
    private readonly numberLiteralCache: Map <number, string> = new Map();

    /**
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param {SimpleLiteral} literalNode
     * @returns {Node}
     */
    public replace (literalNode: ESTree.SimpleLiteral): ESTree.Node {
        const literalValue: ESTree.SimpleLiteral['value'] = literalNode.value;

        if (typeof literalValue !== 'number') {
            throw new Error('`NumberLiteralObfuscatingReplacer` should accept only literals with `number` value');
        }

        let rawValue: string;

        if (this.numberLiteralCache.has(literalValue)) {
            rawValue = <string>this.numberLiteralCache.get(literalValue);
        } else {
            if (!NumberUtils.isCeil(literalValue)) {
                rawValue = String(literalValue);
            } else {
                rawValue = `${Utils.hexadecimalPrefix}${NumberUtils.toHex(literalValue)}`;
            }

            this.numberLiteralCache.set(literalValue, rawValue);
        }

        return NodeFactory.literalNode(literalValue, rawValue);
    }
}
