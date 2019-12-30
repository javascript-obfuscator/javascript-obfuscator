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
    private readonly graph: Map<TValue, TValue[]> = new Map();

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
        const consequents: TValue[] = Array.from(this.graph.keys());

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
     * @param {TValue} consequent
     */
    private delete (consequent: TValue): void {
        const precedents: TValue[] = this.getPrecedents(consequent);

        if (precedents.length) {
            throw new Error(`Unable to remove non-root node: ${consequent}`);
        }

        this.graph.delete(consequent);

        const precedentsGroups: string[][] = Array.from(this.graph.values());

        for (const precedentsGroup of precedentsGroups) {
            const precedentsCount: number = precedentsGroup.length - 1;

            for (let index: number = precedentsCount; index >= 0; index = index - 1) {
                if (precedentsGroup[index] !== consequent) {
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
        const consequents: TValue[] = Array.from(this.graph.keys());
        const rootNodes: TValue[] = [];

        for (const consequent of consequents) {
            if (!this.hasPrecedents(consequent)) {
                rootNodes.push(consequent);
            }
        }

        return rootNodes;
    }

    /**
     * @param {TValue} consequent
     * @returns {TValue[]}
     */
    private getPrecedents (consequent: TValue): TValue[] {
        const precedents: TValue[] | undefined = this.graph.get(consequent);

        if (!precedents) {
            throw new Error(`Unknown node: ${consequent}`);
        }

        return precedents;
    }

    /**
     * @returns {boolean}
     */
    private hasNodes (): boolean {
        return this.graph.size > 0;
    }

    /**
     * @param {TValue} consequent
     * @returns {boolean}
     */
    private hasPrecedents (consequent: TValue): boolean {
        return this.getPrecedents(consequent).length > 0;
    }

    /**
     * @param {TValue} precedent
     * @param {TValue} consequent
     * @returns {this}
     */
    private link (precedent: TValue, consequent: TValue): this {
        this.register(precedent);
        this.register(consequent);

        const target: TValue[] | undefined = this.graph.get(consequent);

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
        if (!this.graph.has(name)) {
            this.graph.set(name, []);
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

        const precedents: TValue[] = this.getPrecedents(name);

        for (const precedent of precedents) {
            this.visit(results, marks, precedent);
        }

        marks[name] = 'ok';
        results.push(name);

        return;
    }
}
