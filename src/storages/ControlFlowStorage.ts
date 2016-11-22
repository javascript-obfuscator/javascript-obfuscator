import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { AbstractStorage } from './AbstractStorage';
import { Utils } from '../Utils';

export class ControlFlowStorage extends AbstractStorage <ICustomNode> {
    /**
     * @type {Map <string, ICustomNode>}
     */
    protected storage: Map <string, ICustomNode> = new Map <string, ICustomNode> ();

    /**
     * @param key
     * @returns {ICustomNode}
     */
    public get (key: string): ICustomNode {
        const value: ICustomNode | undefined = this.storage.get(key);

        if (!value) {
            throw new Error(`No value found in ControlFlowStorage with key \`${key}\``);
        }

        return value;
    }

    /**
     * @param value
     * @returns {string | number | null}
     */
    public getKeyOf (value: ICustomNode): string | number | null {
        return Utils.mapGetFirstKeyOf(this.storage, value);
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        return Array.from(this.storage).length;
    }

    /**
     * @returns {Map <string, ICustomNode>}
     */
    public getStorage (): Map <string, ICustomNode> {
        return this.storage;
    }

    /**
     * @param key
     * @param value
     */
    public set (key: string, value: ICustomNode): void {
        this.storage.set(key, value);
    }

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
