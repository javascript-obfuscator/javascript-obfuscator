/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 *
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        const {selfDefendingFunctionName} = {callControllerFunctionName}(this, function () {
            return {selfDefendingFunctionName}
                .toString()
                .search('(((.+)+)+)+$')
                .toString()
                .constructor({selfDefendingFunctionName})
                .search('(((.+)+)+)+$');
        });
        
        {selfDefendingFunctionName}();
    `;
}
