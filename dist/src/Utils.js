"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSFuck_1 = require('./enums/JSFuck');

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'arrayContains',
        value: function arrayContains(array, searchElement) {
            return array.indexOf(searchElement) >= 0;
        }
    }, {
        key: 'arrayRotate',
        value: function arrayRotate(array, times) {
            var reverse = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (times < 0) {
                return;
            }
            var newArray = array,
                temp = void 0;
            while (times--) {
                if (!reverse) {
                    temp = newArray.pop();
                    newArray.unshift(temp);
                } else {
                    temp = newArray.shift();
                    newArray.push(temp);
                }
            }
            return newArray;
        }
    }, {
        key: 'btoa',
        value: function btoa(string) {
            return new Buffer(encodeURI(string)).toString('base64');
        }
    }, {
        key: 'decToHex',
        value: function decToHex(dec) {
            var decToHexSliceValue = -6,
                exponent = 6,
                radix = 16;
            return (dec + Math.pow(radix, exponent)).toString(radix).substr(decToHexSliceValue).replace(Utils.hexRepetitiveZerosRegExp, '');
        }
    }, {
        key: 'getRandomInteger',
        value: function getRandomInteger(min, max) {
            return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
        }
    }, {
        key: 'getRandomVariableName',
        value: function getRandomVariableName() {
            var length = arguments.length <= 0 || arguments[0] === undefined ? 6 : arguments[0];

            var rangeMinInteger = 10000,
                rangeMaxInteger = 99999999,
                prefix = '_0x';
            return '' + prefix + Utils.decToHex(Utils.getRandomInteger(rangeMinInteger, rangeMaxInteger)).substr(0, length);
        }
    }, {
        key: 'isInteger',
        value: function isInteger(number) {
            return number % 1 === 0;
        }
    }, {
        key: 'strEnumify',
        value: function strEnumify(obj) {
            return obj;
        }
    }, {
        key: 'stringToJSFuck',
        value: function stringToJSFuck(string) {
            return Array.from(string).map(function (character) {
                return JSFuck_1.JSFuck[character] || character;
            }).join(' + ');
        }
    }, {
        key: 'stringToUnicode',
        value: function stringToUnicode(string) {
            var radix = 16;
            var prefix = void 0,
                regexp = new RegExp('[\x00-\x7F]'),
                template = void 0;
            return '\'' + string.replace(/[\s\S]/g, function (escape) {
                if (regexp.test(escape)) {
                    prefix = '\\x';
                    template = '0'.repeat(2);
                } else {
                    prefix = '\\u';
                    template = '0'.repeat(4);
                }
                return '' + prefix + (template + escape.charCodeAt(0).toString(radix)).slice(-template.length);
            }) + '\'';
        }
    }]);

    return Utils;
}();

Utils.hexRepetitiveZerosRegExp = new RegExp('^(0{2,})+(?!$)', '');
exports.Utils = Utils;
