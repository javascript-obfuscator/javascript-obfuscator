/**
 * @returns {string}
 */
export function DebugProtectionFunctionTemplate (): string {
    return `
        function {debugProtectionFunctionName} (ret) {
            function debuggerProtection (counter) {
                if (counter.toString()['1'] % counter.toString()['3'] != ![]) {
                    {debuggerTemplate}
                
                    debuggerProtection(++counter);
                } 
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
