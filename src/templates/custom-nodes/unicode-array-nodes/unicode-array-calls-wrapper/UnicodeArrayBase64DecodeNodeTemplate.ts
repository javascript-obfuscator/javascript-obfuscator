/**
 * @returns {string}
 */
export function UnicodeArrayBase64DecodeNodeTemplate (): string {
    return `      
        if (!{unicodeArrayCallsWrapperName}.atobPolyfillAppended) {
            {atobPolyfill}
            
            {unicodeArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
                
        var decodedValues = {unicodeArrayCallsWrapperName}.data || {};
        
        if (!decodedValues[index]) {
            var base64DecodeUnicode = function (str) {
                return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            }
            
            {selfDefendingCode}
            
            value = base64DecodeUnicode(value);
            decodedValues[index] = value;
        } else {
            value = decodedValues[index];
        }  
        
        {unicodeArrayCallsWrapperName}.data = decodedValues;                             
    `;
}
