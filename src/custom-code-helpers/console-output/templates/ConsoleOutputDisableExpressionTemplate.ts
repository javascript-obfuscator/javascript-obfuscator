/**
 * @returns {string}
 */
export function ConsoleOutputDisableExpressionTemplate (): string {
    return `
        const {consoleLogDisableFunctionName} = {callControllerFunctionName}(this, function () {            
            {globalVariableTemplate}
                        
            const _console = (that.console = that.console || {});
            const methods = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];
            
            for (let index = 0; index < methods.length; index++){
                const func = {callControllerFunctionName}.constructor();
                const methodName = methods[index];
                const originalFunction = _console[methodName] || func;

                func.toString = originalFunction.toString.bind(originalFunction);
                _console[methodName] = func;
            };
        });
        
        {consoleLogDisableFunctionName}();
    `;
}
