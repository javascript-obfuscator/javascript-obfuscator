/**
 * @returns {string}
 */
export function ConsoleOutputDisableExpressionTemplate (): string {
    return `
        var {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            var getGlobal = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
            
            var func = function () {};
            var that = getGlobal();
                        
            that.console.log = func; 
            that.console.error = func;
            that.console.warn = func;
            that.console.info = func;
        });
        
        {consoleLogDisableFunctionName}();
    `;
}
