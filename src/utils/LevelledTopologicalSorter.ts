import { injectable } from 'inversify';

import { ILevelledTopologicalSorter } from '../interfaces/utils/ILevelledTopologicalSorter';

type TVisitMark = 'ok' | 'visiting';

interface IVisitMarks <TValue extends string> {
    [key: string]: TVisitMark;
}

/**
 * Port and rework of https://github.com/loveencounterflow/ltsort
 */
@injectable()
export class LevelledTopologicalSorter <TValue extends string = string> implements ILevelledTopologicalSorter<TValue> {
    /**
     * @type {Map<TValue, TValue[]}
     */
    private readonly precedents: Map<TValue, TValue[]> = new Map();

    /**
     * @param {TValue} precedent
     * @param {TValue | null} consequent
     * @returns {this}
     */
    public add (
        precedent: TValue,
        consequent: TValue | null = null
    ): this {
        if (consequent !== null) {
            return this.link(precedent, consequent);
        }

        return this.register(precedent);
    }

    /**
     * As given in http://en.wikipedia.org/wiki/Topological_sorting
     *
     * @returns {TValue[]}
     */
    public sort (): TValue[] {
        const consequents: TValue[] = Array.from(this.precedents.keys());

        const results: TValue[] = [];
        const marks: IVisitMarks<TValue> = {};

        for (const consequent of consequents) {
            if (marks[consequent] !== undefined) {
                continue;
            }

            this.visit(results, marks, consequent);
        }

        return results;
    }

    /**
     * @returns {TValue[][]}
     */
    public sortByGroups (): TValue[][] {
        this.sort();

        const resultItemsGroups: TValue[][] = [];

        while (this.hasNodes()) {
            const rootNodes: TValue[] = this.findRootNodes();

            resultItemsGroups.push(rootNodes);

            for (const rootNode of rootNodes) {
                this.delete(rootNode);
            }
        }

        return resultItemsGroups;
    }

    /**
     * @param {TValue} name
     */
    private delete (name: TValue): void {
        const precedents: TValue[] = this.getPrecedents(name);

        if (precedents.length) {
            throw new Error(`Unable to remove non-root node: ${name}`);
        }

        this.precedents.delete(name);

        const precedentsGroups: string[][] = Array.from(this.precedents.values());

        for (const precedentsGroup of precedentsGroups) {
            const precedentsCount: number = precedentsGroup.length - 1;

            for (let index: number = precedentsCount; index >= 0; index = index - 1) {
                if (precedentsGroup[index] !== name) {
                    continue;
                }

                precedentsGroup.splice(index, 1);
            }
        }
    }

    /**
     * @returns {TValue[]}
     */
    private findRootNodes (): TValue[] {
        const precedents: TValue[] = Array.from(this.precedents.keys());
        const rootNodes: TValue[] = [];

        for (const name of precedents) {
            if (!this.hasPrecedents(name)) {
                rootNodes.push(name);
            }
        }

        return rootNodes;
    }

    /**
     * @param {TValue} name
     * @returns {TValue[]}
     */
    private getPrecedents (name: TValue): TValue[] {
        const precedents: TValue[] | undefined = this.precedents.get(name);

        if (!precedents) {
            throw new Error(`Unknown node: ${name}`);
        }

        return precedents;
    }

    /**
     * @returns {boolean}
     */
    private hasNodes (): boolean {
        return this.precedents.size > 0;
    }

    /**
     * @param {TValue} name
     * @returns {boolean}
     */
    private hasPrecedents (name: TValue): boolean {
        return this.getPrecedents(name).length > 0;
    }

    /**
     * @param {TValue} precedent
     * @param {TValue} consequent
     * @returns {this}
     */
    private link (precedent: TValue, consequent: TValue): this {
        this.register(precedent);
        this.register(consequent);

        const target: TValue[] | undefined = this.precedents.get(consequent);

        if (target && !target.includes(precedent)) {
            target.push(precedent);
        }

        return this;
    }

    /**
     * @param {TValue} name
     * @returns {this}
     */
    private register (name: TValue): this {
        if (!this.precedents.has(name)) {
            this.precedents.set(name, []);
        }

        return this;
    }

    /**
     * @param {TValue[]} results
     * @param {IVisitMarks<TValue>} marks
     * @param {TValue} name
     * @returns {null}
     */
    private visit (
        results: TValue[],
        marks: IVisitMarks<TValue>,
        name: TValue
    ): void {
        const mark: TVisitMark = marks[name];

        if (mark === 'visiting') {
            throw new Error(`Detected cycle involving node: ${name}`);
        }

        if (mark) {
            return;
        }

        marks[name] = 'visiting';

        const references: TValue[] = this.getPrecedents(name);

        for (const precedent of references) {
            this.visit(results, marks, precedent);
        }

        marks[name] = 'ok';
        results.push(name);

        return;
    }
}
