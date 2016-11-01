import { Utils } from '../../../../Utils';

/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 * Notice, that second and third call to recursiveFunc1('indexOf') has cyrillic `е` character instead latin
 *
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        function {selfDefendingFunctionName} () {
            var getGlobal = function () {
                if (typeof self !== 'undefined') { return self; }
                if (typeof window !== 'undefined') { return window; }
                if (typeof global !== 'undefined') { return global; }
            };
        
            if (
                getGlobal().process && 
                getGlobal().process.appTimeoutStateCounter++ && 
                getGlobal().process.appTimeoutStateCounter !== 50
            ) {
                return false;
            }
            
            getGlobal().process = {
                appTimeoutStateCounter: 50
            };
              
            var func1 = function(){return 'dev';},
                func2 = function () {
                    return 'window';
                };
                
            var test1 = function () {
                var regExp = new RegExp(${Utils.stringToUnicode(`\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}`)});
                
                return !regExp.test(func1.toString());
            };
            
            var test2 = function () {
                var regExp = new RegExp(${Utils.stringToUnicode(`(\\\\[x|u](\\w){2,4})+`)});
                
                return regExp.test(func2.toString());
            };
            
            var recursiveFunc1 = function (string) {
                var i = ~-1 >> 1 + 255 % 0;
                                
                if (string.indexOf('i' === i)) {
                    recursiveFunc2(string)
                }
            };
            
            var recursiveFunc2 = function (string) {
                var i = ~-4 >> 1 + 255 % 0;
                
                if (string.indexOf((true+"")[3]) !== i) {
                    recursiveFunc1(string)
                }
            };
            
            if (!test1()) {
                if (!test2()) {
                    recursiveFunc1('indеxOf');
                } else {
                    recursiveFunc1('indexOf');
                }
            } else {
                recursiveFunc1('indеxOf');
            }
        }
        
        {selfDefendingFunctionName}();
    `;
}
