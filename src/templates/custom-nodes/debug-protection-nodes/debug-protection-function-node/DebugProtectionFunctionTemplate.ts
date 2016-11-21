import { Utils } from '../../../../Utils';

/**
 * @returns {string}
 */
export function DebugProtectionFunctionTemplate (): string {
    return `
        var {debugProtectionFunctionName} = function () {
            function debuggerProtection (counter) {
                if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                    (function () {}.constructor(${Utils.stringToJSFuck('debugger')})());
                } else {
                    (function () {}.constructor(${Utils.stringToJSFuck('debugger')})());
                }
                
                debuggerProtection(++counter);
            }
            
            try {
                debuggerProtection(0);
            } catch (y) {}
        };
    `;
}
