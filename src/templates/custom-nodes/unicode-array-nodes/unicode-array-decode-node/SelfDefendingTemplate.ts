import { JSFuck } from "../../../../enums/JSFuck";

import { Utils } from "../../../../Utils";

/**
 * @param unicodeArrayName
 * @param forLoopFunctionName
 * @returns {string}
 */
export function SelfDefendingTemplate (unicodeArrayName: string, forLoopFunctionName: string): string {
    let environmentName: string = Utils.getRandomVariableName();

    return `
        var ${environmentName} = function(){return ${Utils.stringToUnicode('dev')};};
           
        Function(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})()[${Utils.stringToUnicode('test')}](${environmentName}[${Utils.stringToUnicode('toString')}]()) !== ${JSFuck.True} && !${unicodeArrayName}++ ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.True}){}')() : Function(${Utils.stringToUnicode('a')}, atob(${Utils.stringToUnicode(Utils.btoa('a.call()'))}))(${forLoopFunctionName}) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.False}){}')() : []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.False}){}')();
    `;
}
