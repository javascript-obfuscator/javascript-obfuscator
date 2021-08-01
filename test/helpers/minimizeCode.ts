import {minify} from 'terser';

/**
 * Minimizes code
 *
 * @param {string} code
 * @returns {string}
 */
export async function minimizeCode (code: string): Promise<string> {
    const result = await minify(code);

    return result.code ?? '';
}