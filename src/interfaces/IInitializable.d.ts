export interface IInitializable <T extends any[] = never[]> {
    [key: string]: any;

    /**
     * @param args
     */
    initialize (...args: T): void;
}
