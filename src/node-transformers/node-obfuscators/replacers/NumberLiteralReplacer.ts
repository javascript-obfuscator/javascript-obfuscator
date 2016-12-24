import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractReplacer } from './AbstractReplacer';
import { Utils } from '../../../utils/Utils';

@injectable()
export class NumberLiteralReplacer extends AbstractReplacer {
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
     * @returns {string}
     */
    public replace (nodeValue: number): string {
        if (this.numberLiteralCache.has(nodeValue)) {
            return <string>this.numberLiteralCache.get(nodeValue);
        }

        let result: string;

        if (!Utils.isCeilNumber(nodeValue)) {
            result = String(nodeValue);
        } else {
            result = `${Utils.hexadecimalPrefix}${Utils.decToHex(nodeValue)}`;
        }

        this.numberLiteralCache.set(nodeValue, result);

        return result;
    }
}
