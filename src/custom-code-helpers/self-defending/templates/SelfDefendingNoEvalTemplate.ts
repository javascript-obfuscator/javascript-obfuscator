/**
 * Notice, that second and third call to recursiveFunc1('indexOf') has cyrillic `е` character instead latin
 *
 * @returns {string}
 */
export function SelfDefendingNoEvalTemplate (): string {
    return `
        const {selfDefendingFunctionName} = {callControllerFunctionName}(this, function () {
            {globalVariableTemplate}
        
            const test = function () {
                const regExp = new that.RegExp('^([^ ]+( +[^ ]+)+)+[^ ]}');
                
                return !regExp.test({selfDefendingFunctionName});
            };
            
            return test();
        });
        
        {selfDefendingFunctionName}();
    `;
}
