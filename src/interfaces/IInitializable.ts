export interface IInitializable <T extends unknown[] = never[]> {
    [key: string]: any;

    /**
     * @param args
     */
    initialize (...args: T): void;
}
