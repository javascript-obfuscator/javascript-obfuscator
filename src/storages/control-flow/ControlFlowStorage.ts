import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';

import { MapStorage } from '../MapStorage';

export class ControlFlowStorage extends MapStorage <ICustomNode> {
    /**
     * @returns {string}
     */
    public toString (): string {
        return Array
            .from(this.storage)
            .reduce((controlFlowStorageItems: string[], [key, value]: [string, ICustomNode]) => {
                controlFlowStorageItems.push(`${key}: ${value.getCode()}`);

                return controlFlowStorageItems;
            }, [])
            .join(',');
    }
}
