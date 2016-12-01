export interface IInitializable {
    /**
     * @type {boolean}
     */
    initialized: boolean;

    checkInitialization (): void;

    /**
     * @param args
     */
    initialize (...args: any[]): void;
}
