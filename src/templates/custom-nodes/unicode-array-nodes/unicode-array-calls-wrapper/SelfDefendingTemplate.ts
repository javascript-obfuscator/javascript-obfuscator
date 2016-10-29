import { Utils } from '../../../../Utils';

/**
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        var func = function(){return 'dev';};
                           
        !{unicodeArrayCallsWrapperName}.flag ? ({unicodeArrayCallsWrapperName}.flag = true, Function(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})()['test'](func['toString']()) !== true && !{unicodeArrayName}++ ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(true){}')() : (value = Function('a', 'b', 'c', 'd', 'return a.call(null, b, c, d)')({decodeFunctionName}, decodedValues, index, value)) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(false){}')() : []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(false){}')()) : (value = Function('a', 'b', 'c', 'd', 'return a.call(null, b, c, d)')({decodeFunctionName}, decodedValues, index, value));
    `;
}
