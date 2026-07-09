/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 *
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        const {selfDefendingFunctionName} = {callControllerFunctionName}(this, function () {
            if ({selfDefendingFunctionName}.bind().toString().indexOf('\\n') !== -1) {
                return;
            }

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
