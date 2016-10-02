import { JSFuck } from 'app/enums/JSFuck';

import { AbstractReplacer } from './AbstractReplacer';

export class BooleanLiteralReplacer extends AbstractReplacer {
    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: boolean): string {
        return nodeValue ? JSFuck.True : JSFuck.False;
    }
}
