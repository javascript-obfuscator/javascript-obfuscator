import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractReplacer } from './AbstractReplacer';
import { Utils } from '../../../utils/Utils';

@injectable()
export class NumberLiteralReplacer extends AbstractReplacer {
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
        if (!Utils.isCeilNumber(nodeValue)) {
            return String(nodeValue);
        }

        return `${Utils.hexadecimalPrefix}${Utils.decToHex(nodeValue)}`;
    }
}
