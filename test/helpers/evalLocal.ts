/**
 * Evaluates code using indirect eval.
 * Indirect eval runs in global scope without inheriting strict mode from the calling context.
 * This is needed for testing features like Annex B function hoisting.
 *
 * @param {string} code
 * @returns {any}
 */
export const evalLocal = (code: string): any => (0, eval)(code);
