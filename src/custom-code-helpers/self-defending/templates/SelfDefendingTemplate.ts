/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 *
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        const {selfDefendingFunctionName} = {callControllerFunctionName}(this, function () {
            return {selfDefendingFunctionName}
                .constructor('return /" + this + "/')
                .call()
                .constructor('(.*)+\\\\S}')
                .test({selfDefendingFunctionName});
        });
        
        {selfDefendingFunctionName}();
    `;
}
