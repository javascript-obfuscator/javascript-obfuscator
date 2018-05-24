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
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param {number} nodeValue
     * @returns {Node}
     */
    public replace (nodeValue: number): ESTree.Node {
        let rawValue: string;

        if (this.numberLiteralCache.has(nodeValue)) {
            rawValue = <string>this.numberLiteralCache.get(nodeValue);
        } else {
            if (!NumberUtils.isCeil(nodeValue)) {
                rawValue = String(nodeValue);
            } else {
                rawValue = `${Utils.hexadecimalPrefix}${NumberUtils.toHex(nodeValue)}`;
            }

            this.numberLiteralCache.set(nodeValue, rawValue);
        }

        return NodeFactory.literalNode(nodeValue, rawValue);
    }
}
