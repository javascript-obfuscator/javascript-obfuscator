import { Utils } from '../../../../Utils';

/**
 * @returns {string}
 */
export function SelfDefendingTemplate (): string {
    return `
        var func = function(){return 'dev';};
        var object = []['filter']['constructor'];
                           
        !{unicodeArrayCallsWrapperName}.flag ? ({unicodeArrayCallsWrapperName}.flag = true, Function(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})()['test'](func['toString']()) !== true && !{unicodeArrayName}++ ? object(${Utils.stringToJSFuck('while')} + '(true){}')() : false ? object(${Utils.stringToJSFuck('while')} + '(false){}')() : object(${Utils.stringToJSFuck('while')} + '(false){}')()) : false;
    `;
}
