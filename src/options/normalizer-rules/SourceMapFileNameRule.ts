import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const SourceMapFileNameRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    let { sourceMapFileName }: { sourceMapFileName: string } = options;

    if (sourceMapFileName) {
        sourceMapFileName = sourceMapFileName
            .replace(/^\/+/, '')
            .split('.')[0];

        options = {
            ...options,
            sourceMapFileName: `${sourceMapFileName}.js.map`
        };
    }

    return options;
};
