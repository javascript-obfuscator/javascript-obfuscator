/**
 * @returns {string}
 */
export function ConsoleOutputDisableExpressionTemplate (): string {
    return `
        const {consoleLogDisableFunctionName} = {callControllerFunctionName}(this, function () {            
            {globalVariableTemplate}
                        
            const _console = (that.console = that.console || {});
            const methods = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];
            
            for (var i = 0; i < methods.length; i++){
                const func = {consoleLogDisableFunctionName}.constructor();
                const methodName = methods[i];
                const originalFunction = _console[methodName] || func;

                func.toString = originalFunction.toString.bind(originalFunction);
                _console[methodName] = func;
            };
        });
        
        {consoleLogDisableFunctionName}();
    `;
}
