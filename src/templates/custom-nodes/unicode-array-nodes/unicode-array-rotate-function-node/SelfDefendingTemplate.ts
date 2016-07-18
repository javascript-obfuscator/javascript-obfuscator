import { JSFuck } from "../../../../enums/JSFuck";

import { Utils } from "../../../../Utils";

/**
 * @param whileFunctionName
 * @param timesName
 * @returns {string}
 */
export function SelfDefendingTemplate (whileFunctionName: string, timesName: string): string {
    return `(function () {
        var func = function(){return ${Utils.stringToUnicode('dev')};};
                            
        !Function(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})().test(func.toString()) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.True}){}')() : Function(${Utils.stringToUnicode('a')}, ${Utils.stringToUnicode('b')}, ${Utils.stringToUnicode('a(++b)')})(${whileFunctionName}, ${timesName}) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.False}){}')() : []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.False}){}')();
    })();`;
}
