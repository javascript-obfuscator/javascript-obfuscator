import { Utils } from "../../../../Utils";

/**
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `(function () {
        var func = function(){return 'dev';};
                            
        !Function(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})().test(func.toString()) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(true){}')() : Function('a', 'b', 'a(++b)')({whileFunctionName}, {timesName}) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(false){}')() : []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(false){}')();
    })();`;
}
