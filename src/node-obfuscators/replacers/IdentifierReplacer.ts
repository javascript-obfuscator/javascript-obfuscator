import { AbstractReplacer } from "./AbstractReplacer";
import { Utils } from "../../Utils";

export class IdentifierReplacer extends AbstractReplacer {
    /**
     * @param nodeValue
     * @param namesMap
     * @returns {string}
     */
    public replace (nodeValue: string, namesMap: Map <string, string>): string {
        const obfuscatedIdentifierName: string|undefined = namesMap.get(nodeValue);

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
     * @param namesMap
     */
    public storeNames (nodeName: string, namesMap: Map <string, string>): void {
        if (!this.isReservedName(nodeName)) {
            namesMap.set(nodeName, Utils.getRandomVariableName());
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
