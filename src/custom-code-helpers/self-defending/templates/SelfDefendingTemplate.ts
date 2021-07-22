/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 *
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        const {selfDefendingFunctionName} = {callControllerFunctionName}(this, function () {
            const test = function () {
                const regExp = test
                    .constructor('return /" + this + "/')
                    .call()
                    .constructor('([\\\\S]+([\\\\s]+[\\\\S]+)+)+[\\\\S]}');
                
                return !regExp.test({selfDefendingFunctionName});
            };
            
            return test();
        });
        
        {selfDefendingFunctionName}();
    `;
}
