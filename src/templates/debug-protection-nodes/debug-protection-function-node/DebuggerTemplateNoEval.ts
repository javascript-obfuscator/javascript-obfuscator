/**
 * @returns {string}
 */
export function DebuggerTemplateNoEval (): string {
    return `
        if (typeof counter === 'string') {
            var func = function () {
                while (true) {}
            };
            
            return func();
        } else {
            if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                debugger;
            } else {
                debugger;
            }
            
        }
    `;
}
