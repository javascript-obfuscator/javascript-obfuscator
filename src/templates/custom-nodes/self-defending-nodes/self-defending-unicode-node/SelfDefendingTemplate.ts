import { JSFuck } from "../../../../enums/JSFuck";

import { Utils } from "../../../../Utils";

export function SelfDefendingTemplate (): string {
    return `
        (function () {                                
            var func = function(){return ${Utils.stringToUnicode('dev')};},
                func2 = function () {
                    return 'window';
                };
        
            !Function(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})().test(func.toString()) ? Function(${Utils.stringToUnicode(`return/(\\\\[x|u](\\w){2,4})+/`)})().test(func2.toString()) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.False}){}')() : []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.True}){}')() : []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.False}){}')();
        })();
    `;
}
