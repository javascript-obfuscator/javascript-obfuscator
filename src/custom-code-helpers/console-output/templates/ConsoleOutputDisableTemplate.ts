/**
 * @returns {string}
 */
export function ConsoleOutputDisableTemplate (): string {
    return `
        const {consoleLogDisableFunctionName} = {callControllerFunctionName}(this, function () {
            {globalVariableTemplate}

            const consoleObject = (that.console = that.console || {});
            const methods = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];

            for (let index = 0; index < methods.length; index++){
                const func = {callControllerFunctionName}.constructor.prototype.bind({callControllerFunctionName});
                const methodName = methods[index];
                const originalFunction = consoleObject[methodName] || func;

                func.__proto__ = {callControllerFunctionName}.bind({callControllerFunctionName});
                func.toString = originalFunction.toString.bind(originalFunction);
                
                consoleObject[methodName] = func;
            }
        });

        {consoleLogDisableFunctionName}();
    `;
}
