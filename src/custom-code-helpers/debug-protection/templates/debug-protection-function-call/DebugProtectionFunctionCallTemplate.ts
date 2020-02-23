/**
 * @returns {string}
 */
export function DebugProtectionFunctionCallTemplate (): string {
    return `
        (function () {
            {callControllerFunctionName}(
                this,
                function () {
                    const regExp1 = new RegExp('function *\\\\( *\\\\)');
                    const regExp2 = new RegExp('\\\\+\\\\+ *\\(?:[a-zA-Z_$][0-9a-zA-Z_$]*\\)', 'i');
           
                    const result = {debugProtectionFunctionName}('init');
                    
                    if (!regExp1.test(result + 'chain') || !regExp2.test(result + 'input')) {
                        result('0');
                    } else {
                        {debugProtectionFunctionName}();
                    }
                }
            )();
        })();
    `;
}
