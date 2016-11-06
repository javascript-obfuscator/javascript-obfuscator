import { AbstractReplacer } from './AbstractReplacer';
import { Utils } from '../../Utils';

export class IdentifierReplacer extends AbstractReplacer {
    /**
     * @type {Map<string, string>}
     */
    private namesMap: Map<string, string> = new Map<string, string>();

    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: string): string {
        const obfuscatedIdentifierName: string|undefined = this.namesMap.get(nodeValue);

        if (!obfuscatedIdentifierName) {
            return nodeValue;
        }

        return obfuscatedIdentifierName;
    }

    /**
     * Store all identifiers names as keys in given `namesMap` with random names as value.
     * Reserved names will be ignored.
     *
     * @param nodeName
     */
    public storeNames (nodeName: string): void {
        if (!this.isReservedName(nodeName)) {
            this.namesMap.set(nodeName, Utils.getRandomVariableName());
        }
    }

    /**
     * @param name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').test(name);
            });
    }
}
