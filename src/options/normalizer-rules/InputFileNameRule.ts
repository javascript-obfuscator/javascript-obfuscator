import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { StringSeparator } from '../../enums/StringSeparator';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const InputFileNameRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    let { inputFileName } = options;

    if (inputFileName) {
        inputFileName = inputFileName
            .replace(/^\/+/, '')
            .split(StringSeparator.Dot)
            .slice(0, -1)
            .join(StringSeparator.Dot) || inputFileName;

        options = {
            ...options,
            inputFileName: `${inputFileName}.js`
        };
    }

    return options;
};
