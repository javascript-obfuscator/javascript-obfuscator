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
                var stringChars = atob(str).split('');
                var newStringChars = '';
                
                for (var char in stringChars) {
                    newStringChars += '%' + ('00' + stringChars[char].charCodeAt(0).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
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
