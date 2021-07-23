/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 *
 * @returns {string}
 */
export function SelfDefendingNoEvalTemplate (): string {
    return `
        const {selfDefendingFunctionName} = {callControllerFunctionName}(this, function () {
            {globalVariableTemplate}
        
            return that
                .RegExp('(.*)+\\\\S}')
                .test({selfDefendingFunctionName});
        });
        
        {selfDefendingFunctionName}();
    `;
}
