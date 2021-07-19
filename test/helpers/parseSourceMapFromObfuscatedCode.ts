import { ISourceMap } from '../../src/interfaces/source-code/ISourceMap';

import { cryptUtilsAtob } from './cryptUtilsAtob';

/**
 * @param {string} obfuscatedCodeWithInlineSourceMap
 * @returns {ISourceMap}
 */
export function parseSourceMapFromObfuscatedCode (obfuscatedCodeWithInlineSourceMap: string): ISourceMap {
    return JSON.parse(cryptUtilsAtob(obfuscatedCodeWithInlineSourceMap.split('base64,')[1]));
}
