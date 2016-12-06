import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { IOptions } from '../../../interfaces/options/IOptions';

import { JSFuck } from '../../../enums/JSFuck';

import { AbstractReplacer } from './AbstractReplacer';

@injectable()
export class BooleanLiteralReplacer extends AbstractReplacer {
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
    public replace (nodeValue: boolean): string {
        return nodeValue ? JSFuck.True : JSFuck.False;
    }
}
