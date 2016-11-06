/**
 * @returns {string}
 */
export function ConsoleOutputDisableExpressionTemplate (): string {
    return `
        var {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            var getGlobal = Function('return typeof self !== "undefined"' + ' ? self : ' + 'typeof window !== "undefined"' + ' ? window : ' + 'typeof global !== "undefined"' + ' ? global : ' + '[]["filter"]["constructor"]("return this")()');
            
            var func = Function('for ' + '(;;)' + ' {}');
            var that = getGlobal();
                        
            that.console.log = func; 
            that.console.error = func;
            that.console.warn = func;
            that.console.info = func;
        });
        
        {consoleLogDisableFunctionName}();
    `;
}
