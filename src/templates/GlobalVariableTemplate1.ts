/**
 * @returns {string}
 */
export function GlobalVariableTemplate1 (): string {
    return `
        var that;
        
        try {
            var getGlobal = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
            
            that = getGlobal();
        } catch (e) {
            that = window;
        }
    `;
}
