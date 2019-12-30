export interface ILevelledTopologicalSorter <TValue extends string = string> {
    /**
     * @param {TValue} precedent
     * @param {TValue | null} consequent
     * @returns {this}
     */
    add (
        precedent: TValue,
        consequent?: TValue | null
    ): this;

    /**
     * @returns {TValue[]}
     */
    sort (): TValue[];

    /**
     * @returns {TValue[][]}
     */
    sortByGroups (): TValue[][];
}
