"use strict";
class OptionsNormalizer {
    static normalize(options) {
        let normalizedOptions = Object.assign({}, options);
        normalizedOptions = OptionsNormalizer.unicodeArrayRule(normalizedOptions);
        return normalizedOptions;
    }
    static unicodeArrayRule(options) {
        if (!options['unicodeArray']) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }
        return options;
    }
}
OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS = {
    encodeUnicodeLiterals: false,
    rotateUnicodeArray: false,
    unicodeArray: false,
    wrapUnicodeArrayCalls: false
};
exports.OptionsNormalizer = OptionsNormalizer;
