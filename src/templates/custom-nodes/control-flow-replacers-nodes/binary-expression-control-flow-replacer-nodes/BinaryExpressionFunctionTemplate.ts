/**
 * @returns {string}
 */
export function BinaryExpressionFunctionTemplate (): string {
    return `
        function {functionName} (x, y) {
            return x {operator} y;
        }
    `;
}
