"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OptionsNormalizer = function () {
    function OptionsNormalizer() {
        _classCallCheck(this, OptionsNormalizer);
    }

    _createClass(OptionsNormalizer, null, [{
        key: 'normalize',
        value: function normalize(options) {
            var normalizedOptions = Object.assign({}, options);
            normalizedOptions = OptionsNormalizer.unicodeArrayRule(normalizedOptions);
            normalizedOptions = OptionsNormalizer.unicodeArrayThresholdRule(normalizedOptions);
            normalizedOptions = OptionsNormalizer.selfDefendingRule(normalizedOptions);
            return normalizedOptions;
        }
    }, {
        key: 'selfDefendingRule',
        value: function selfDefendingRule(options) {
            if (options['selfDefending']) {
                Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'unicodeArrayRule',
        value: function unicodeArrayRule(options) {
            if (!options['unicodeArray']) {
                Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'unicodeArrayThresholdRule',
        value: function unicodeArrayThresholdRule(options) {
            var minValue = 0,
                maxValue = 1;
            options['unicodeArrayThreshold'] = Math.min(Math.max(options['unicodeArrayThreshold'], minValue), maxValue);
            return options;
        }
    }]);

    return OptionsNormalizer;
}();

OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS = {
    encodeUnicodeLiterals: false,
    rotateUnicodeArray: false,
    unicodeArray: false,
    unicodeArrayThreshold: 0,
    wrapUnicodeArrayCalls: false
};
OptionsNormalizer.SELF_DEFENDING_OPTIONS = {
    compact: true,
    selfDefending: true
};
exports.OptionsNormalizer = OptionsNormalizer;
