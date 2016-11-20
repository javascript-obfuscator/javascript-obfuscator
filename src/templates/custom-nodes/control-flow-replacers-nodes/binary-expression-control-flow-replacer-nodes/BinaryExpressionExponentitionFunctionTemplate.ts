/**
 * @returns {string}
 */
export function BinaryExpressionExponentiationFunctionTemplate (): string {
    return `
        function {functionName} (x, y) {
            return Math.pow(x, y);
        }
    `;
}
