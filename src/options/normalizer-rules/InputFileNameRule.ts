import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const InputFileNameRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    let { inputFileName } = options;

    if (inputFileName) {
        inputFileName = inputFileName
            .replace(/^\/+/, '')
            .split('.')
            .slice(0, -1)
            .join('.') || inputFileName;

        options = {
            ...options,
            inputFileName: `${inputFileName}.js`
        };
    }

    return options;
};
