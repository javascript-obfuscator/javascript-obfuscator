import { AbstractReplacer } from "./AbstractReplacer";
import { Utils } from "../../Utils";

export class NumberLiteralReplacer extends AbstractReplacer {
    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: number): string {
        const prefix: string = '0x';

        if (!Utils.isInteger(nodeValue)) {
            return String(nodeValue);
        }

        return `${prefix}${Utils.decToHex(nodeValue)}`;
    }
}
