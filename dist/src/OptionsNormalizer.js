"use strict";
class OptionsNormalizer {
    static normalize(options) {
        let normalizedOptions = Object.assign({}, options);
        normalizedOptions = OptionsNormalizer.unicodeArrayRule(normalizedOptions);
        return normalizedOptions;
    }
    static unicodeArrayRule(options) {
        const disabledUnicodeArrayOptions = {
            encodeUnicodeLiterals: false,
            rotateUnicodeArray: false,
            unicodeArray: false,
            wrapUnicodeArrayCalls: false
        };
        if (!options['unicodeArray']) {
            Object.assign(options, disabledUnicodeArrayOptions);
        }
        return options;
    }
}
exports.OptionsNormalizer = OptionsNormalizer;
