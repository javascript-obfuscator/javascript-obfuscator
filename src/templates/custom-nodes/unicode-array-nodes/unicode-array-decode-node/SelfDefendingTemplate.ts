import { Utils } from 'app/Utils';

/**
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        var func = function(){return 'dev';};
           
        Function(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})()['test'](func['toString']()) !== true && !{unicodeArrayName}++ ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(true){}')() : Function('a', atob(${Utils.stringToUnicode(Utils.btoa('a.call()'))}))({forLoopFunctionName}) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(false){}')() : []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(false){}')();
    `;
}
