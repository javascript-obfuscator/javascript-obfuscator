import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/IOptions';
import { IStorage } from '../../../interfaces/IStorage';

import { JSFuck } from '../../../enums/JSFuck';

import { AbstractReplacer } from './AbstractReplacer';

@injectable()
export class BooleanLiteralReplacer extends AbstractReplacer {
    /**
     * @param customNodesStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: boolean): string {
        return nodeValue ? JSFuck.True : JSFuck.False;
    }
}
