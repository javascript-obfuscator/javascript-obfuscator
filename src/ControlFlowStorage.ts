import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';

export class ControlFlowStorage {
    /**
     * @type {Map <string, ICustomNode>}
     */
    private storage: Map <string, ICustomNode> = new Map <string, ICustomNode> ();

    /**
     * @param key
     * @param value
     */
    public addToStorage (key: string, value: ICustomNode): void {
        this.storage.set(key, value);
    }

    /**
     * @returns {Map <string, Function>}
     */
    public getStorage (): Map <string, ICustomNode> {
        return this.storage;
    }

    /**
     * @param key
     * @returns {Function}
     */
    public getStorageItem(key: string): ICustomNode {
        const value: ICustomNode | undefined = this.storage.get(key);

        if (!value) {
            throw new Error(`No value found in ControlFlowStorage with key \`${key}\``);
        }

        return value;
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
