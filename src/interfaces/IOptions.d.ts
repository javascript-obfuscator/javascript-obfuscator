export interface IOptions {
    /**
     * @param optionName
     */
    get <T> (optionName: string): T;
}
