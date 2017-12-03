/**
 * @returns {string}
 */
export function DebugProtectionFunctionCallTemplate (): string {
    return `
        (function () {
            {singleNodeCallControllerFunctionName}(this, function () {
                var regExp1 = new RegExp('function *\\\\( *\\\\)');
                var regExp2 = new RegExp('\\\\+\\\\+ *\\(?:_0x(?:[a-f0-9]){4,6}|(?:\\\\b|\\\\d)[a-z0-9]{1,4}(?:\\\\b|\\\\d)\\)', 'i');
       
                var result = {debugProtectionFunctionName}('init');
                
                if (!regExp1.test(result + 'chain') || !regExp2.test(result + 'input')) {
                    result('0');
                } else {
                    {debugProtectionFunctionName}();
                }
            })();
        })();
    `;
}
