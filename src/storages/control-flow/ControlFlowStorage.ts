import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';

import { MapStorage } from '../MapStorage';

export class ControlFlowStorage extends MapStorage <ICustomNode> {
    constructor () {
        super();

        this.initialize();
    }
}
