/**
 * @returns {string}
 */
export function DebugProtectionFunctionTemplate (): string {
    return `     
        function {debugProtectionFunctionName} (ret) {
            function debuggerProtection (counter) {
                if (typeof counter === 'string') {
                    return (function (arg) {}.constructor('while (true) {}').apply('counter'));
                } else {
                    if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                        (function () {return true;}.constructor('debu' + 'gger').call('action'));
                    } else {
                        (function () {return false;}.constructor('debu' + 'gger').apply('stateObject'));
                    }
                    
                }
                
                debuggerProtection(++counter);
            }
            
            try {
                if (ret) {
                    return debuggerProtection;
                } else {
                    debuggerProtection(0);
                }
            } catch (y) {}
        }
    `;
}
