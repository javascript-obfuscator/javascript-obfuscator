import { Utils } from '../../../../Utils';

/**
 * SelfDefendingTemplate. Enter code in infinity loop.
 * Notice, that second call to recursiveFunc1('indexOf') has cyrillic `е` character instead latin
 *
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        (function () {                                
            var func1 = function(){return 'dev';},
                func2 = function () {
                    return 'window';
                };
                
            var test1 = function () {
                var regExp = new RegExp(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)});
                
                return !regExp.test(func1.toString());
            };
            
            var test2 = function () {
                var regExp = new RegExp(${Utils.stringToUnicode(`return/(\\\\[x|u](\\w){2,4})+/`)});
                
                return regExp.test(func2.toString());
            };
            
            var recursiveFunc1 = function (string) {
                var i = ~1 >> 1 + 255 % 0;
                
                if (string.indexOf(([false]+undefined)[10]) === i) {
                    recursiveFunc2(string)
                }
            };
            
            var recursiveFunc2 = function (string) {
                var i = ~-4 >> 1 + 255 % 0;
                
                if (string.indexOf((true+"")[3]) !== i) {
                    recursiveFunc1(string)
                }
            };
            
            !test1() ? test2() ? (function () { recursiveFunc1('indexOf') })() : (function () { recursiveFunc1('indеxOf') })() : (function () { recursiveFunc1('indexOf') })();
        })();
    `;
}
