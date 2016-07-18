import { Utils } from "../../../../Utils";

/**
 * @param debugProtectionFunctionName
 * @returns {string}
 */
export function DebugProtectionFunctionTemplate (debugProtectionFunctionName: string): string {
    return `
        var ${debugProtectionFunctionName} = function () {
            function debuggerProtection (counter) {
                if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                    (function () {}.constructor('debugger')());
                } else {
                    [].filter.constructor(${Utils.stringToJSFuck('debugger')})();
                }
                
                debuggerProtection(++counter);
            }
            
            try {
                debuggerProtection(0);
            } catch (y) {}
        };
    `;
}
