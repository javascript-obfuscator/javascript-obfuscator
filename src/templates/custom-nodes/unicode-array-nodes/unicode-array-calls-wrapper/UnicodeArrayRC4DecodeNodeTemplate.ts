/**
 * @returns {string}
 */
export function UnicodeArrayRc4DecodeNodeTemplate (): string {
    return `
        if (!{unicodeArrayCallsWrapperName}.atobPolyfillAppended) {
            {atobPolyfill}
            
            {unicodeArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
        
        {rc4Polyfill}
                
        var decodedValues = {unicodeArrayCallsWrapperName}.data || {};
        
        if (!decodedValues[index]) {
            var base64DecodeUnicode = function (str) {
                return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            }
        
            {selfDefendingCode}
            
            value = rc4(base64DecodeUnicode(value), key);
            decodedValues[index] = value;
        } else {
            value = decodedValues[index];
        }  
                
        {unicodeArrayCallsWrapperName}.data = decodedValues;                             
    `;
}
