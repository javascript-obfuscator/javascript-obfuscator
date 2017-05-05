export interface IInitializable {
    [key: string]: any;

    /**
     * @param args
     */
    initialize (...args: any[]): void;
}
