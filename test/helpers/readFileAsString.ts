import * as fs from 'fs';

/**
 * @param path
 * @returns {string}
 */
export function readFileAsString (path: string): string {
    return fs.readFileSync(path, 'utf8');
}