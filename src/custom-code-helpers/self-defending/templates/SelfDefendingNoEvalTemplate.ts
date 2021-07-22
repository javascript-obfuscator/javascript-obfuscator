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
                const regExp = that.RegExp('([\\\\S]+([\\\\s]+[\\\\S]+)+)+[\\\\S]}');
                
                return !regExp.test({selfDefendingFunctionName});
            };
            
            return test();
        });
        
        {selfDefendingFunctionName}();
    `;
}
