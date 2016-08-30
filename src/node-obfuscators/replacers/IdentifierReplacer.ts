import { AbstractReplacer } from "./AbstractReplacer";

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
}
