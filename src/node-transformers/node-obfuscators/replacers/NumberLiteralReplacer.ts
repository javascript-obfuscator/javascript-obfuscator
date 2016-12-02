import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { AbstractReplacer } from './AbstractReplacer';
import { Utils } from '../../../Utils';

@injectable()
export class NumberLiteralReplacer extends AbstractReplacer {
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
    public replace (nodeValue: number): string {
        if (!Utils.isInteger(nodeValue)) {
            return String(nodeValue);
        }

        return `${Utils.hexadecimalPrefix}${Utils.decToHex(nodeValue)}`;
    }
}
