export interface IAnalyzer <TArgs extends unknown[], TData extends unknown> {
    /**
     * @param {TArgs} args
     * @returns {TData}
     */
    analyze (...args: TArgs): TData;
}
