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
            {selfDefendingCode}
            
            value = decodeURI(atob(value));
            decodedValues[index] = value;
        } else {
            value = decodedValues[index];
        }  
        
        {unicodeArrayCallsWrapperName}.data = decodedValues;                             
    `;
}
