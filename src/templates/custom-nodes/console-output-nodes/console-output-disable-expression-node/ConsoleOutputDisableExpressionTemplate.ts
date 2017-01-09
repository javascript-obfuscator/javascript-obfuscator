/**
 * @returns {string}
 */
export function ConsoleOutputDisableExpressionTemplate (): string {
    return `
        var {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            var getGlobal = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
            
            var func = function () {};
            var that = getGlobal();
            
            that.console = (function (func){ 
                var c = {}; 
                
                c.log = c.warn = c.debug = c.info = c.error = c.exception = c.trace = func; 
                
                return c; 
            })(func);
        });
        
        {consoleLogDisableFunctionName}();
    `;
}
