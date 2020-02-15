/**
 * @returns {string}
 */
export function GlobalVariableTemplate1 (): string {
    return `
        let that;
        
        try {
            const getGlobal = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
            
            that = getGlobal();
        } catch (e) {
            that = window;
        }
    `;
}
