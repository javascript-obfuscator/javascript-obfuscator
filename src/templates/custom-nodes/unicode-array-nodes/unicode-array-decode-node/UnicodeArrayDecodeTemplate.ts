/**
 * @returns {string}
 */
export function UnicodeArrayDecodeTemplate (): string {
    return `
        (function () {
           {atobPolyfill}
          
            var {forLoopFunctionName} = function () {
                var array = [];
                
                for (var i in {unicodeArrayName}) {
                    array['push'](decodeURI(atob({unicodeArrayName}[i])));
                }
                
                {unicodeArrayName} = array;
            };
            
            {code}
        })();
    `;
}
