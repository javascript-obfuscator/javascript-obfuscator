/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 *
 * @returns {string}
 */
export function SelfDefendingNoEvalTemplate (): string {
    return `
        const {selfDefendingFunctionName} = {callControllerFunctionName}(this, function () {
            {globalVariableTemplate}
        
            const test = function () {
                const regExp = that.RegExp('^([^ ]+([\\\\x20\\\\x09]+[^\\\\x20\\\\x09]+)+)+[^\\\\x20\\\\x09]}');
                
                return !regExp.test({selfDefendingFunctionName});
            };
            
            return test();
        });
        
        {selfDefendingFunctionName}();
    `;
}
