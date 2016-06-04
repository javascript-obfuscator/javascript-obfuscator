"use strict";
class OptionsNormalizer {
    static normalize(options) {
        let normalizedOptions = Object.assign({}, options);
        normalizedOptions = OptionsNormalizer.unicodeArrayRule(normalizedOptions);
        normalizedOptions = OptionsNormalizer.selfDefendingRule(normalizedOptions);
        return normalizedOptions;
    }
    static selfDefendingRule(options) {
        if (options['selfDefending']) {
            Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
        }
        return options;
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
OptionsNormalizer.SELF_DEFENDING_OPTIONS = {
    compact: true,
    selfDefending: true
};
exports.OptionsNormalizer = OptionsNormalizer;
