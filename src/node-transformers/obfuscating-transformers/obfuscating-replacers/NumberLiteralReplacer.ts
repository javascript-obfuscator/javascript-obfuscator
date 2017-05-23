import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractObfuscatingReplacer } from './AbstractObfuscatingReplacer';
import { Nodes } from '../../../node/Nodes';
import { Utils } from '../../../utils/Utils';

@injectable()
export class NumberLiteralReplacer extends AbstractObfuscatingReplacer {
    /**
     * @type {Map<string, string>}
     */
    private readonly numberLiteralCache: Map <number, string> = new Map();

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param nodeValue
     * @returns {ESTree.Node}
     */
    public replace (nodeValue: number): ESTree.Node {
        let rawValue: string;

        if (this.numberLiteralCache.has(nodeValue)) {
            rawValue = <string>this.numberLiteralCache.get(nodeValue);
        } else {
            if (!Utils.isCeilNumber(nodeValue)) {
                rawValue = String(nodeValue);
            } else {
                rawValue = `${Utils.hexadecimalPrefix}${Utils.decToHex(nodeValue)}`;
            }

            this.numberLiteralCache.set(nodeValue, rawValue);
        }

        return Nodes.getLiteralNode(nodeValue, rawValue);
    }
}
