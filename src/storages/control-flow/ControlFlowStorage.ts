import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { MapStorage } from '../MapStorage';

@injectable()
export class ControlFlowStorage extends MapStorage <ICustomNode> {
    /**
     * @param randomGenerator
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        super(randomGenerator);

        this.initialize();
    }
}
