import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { StringSeparator } from '../../enums/StringSeparator';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const SourceMapFileNameRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    let { sourceMapFileName }: { sourceMapFileName: string } = options;

    if (sourceMapFileName) {
        sourceMapFileName = sourceMapFileName.replace(/^\/+/, '');

        // a fully-qualified `*.js.map` file name is already in the canonical form, so it is kept as-is
        // (otherwise the extension-stripping heuristic below would mangle names like `foo.min.js.map`)
        // https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1312
        if (sourceMapFileName.endsWith('.js.map')) {
            return {
                ...options,
                sourceMapFileName
            };
        }

        sourceMapFileName = sourceMapFileName.replace(/(?:\.js)?(?:\.map)?$/, '');

        let sourceMapFileNameParts: string[] = sourceMapFileName.split(StringSeparator.Dot);
        const sourceMapFileNamePartsCount: number = sourceMapFileNameParts.length;
        const lastPart: string = sourceMapFileNameParts[sourceMapFileNamePartsCount - 1];

        // try to predict if last part is extension or not
        if (sourceMapFileNamePartsCount > 1 && lastPart.length <= 3) {
            sourceMapFileNameParts = sourceMapFileNameParts.slice(0, -1);
        }

        sourceMapFileName = sourceMapFileNameParts.join(StringSeparator.Dot);

        options = {
            ...options,
            sourceMapFileName: `${sourceMapFileName}.js.map`
        };
    }

    return options;
};
