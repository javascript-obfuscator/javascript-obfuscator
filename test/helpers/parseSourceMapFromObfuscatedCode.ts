import { ISourceMap } from '../../src/interfaces/source-code/ISourceMap';

import { atob } from './atob';

/**
 * @param {string} obfuscatedCodeWithInlineSourceMap
 * @returns {ISourceMap}
 */
export function parseSourceMapFromObfuscatedCode (obfuscatedCodeWithInlineSourceMap: string): ISourceMap {
    return JSON.parse(atob(obfuscatedCodeWithInlineSourceMap.split('base64,')[1]));
}
