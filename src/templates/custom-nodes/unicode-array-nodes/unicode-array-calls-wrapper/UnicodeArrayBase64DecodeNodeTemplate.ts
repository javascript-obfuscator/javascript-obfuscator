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
                var stringChars = atob(str).split('');
                var newStringChars = '';
                
                for (var char in stringChars) {
                    newStringChars += '%' + ('00' + stringChars[char].charCodeAt(0).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
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
