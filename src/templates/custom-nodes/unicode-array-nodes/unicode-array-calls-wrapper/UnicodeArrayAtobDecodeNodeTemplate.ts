/**
 * @returns {string}
 */
export function UnicodeArrayAtobDecodeNodeTemplate (): string {
    return `      
        if (!{unicodeArrayCallsWrapperName}.atobPolyfillAppended) {
            {atobPolyfill}
            
            {unicodeArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
                
        var decodedValues = {unicodeArrayCallsWrapperName}.data || {};
        
        if (!decodedValues[index]) {
            {code}
            
            value = decodeURI(atob(value));
            decodedValues[index] = value;
        } else {
            value = decodedValues[index];
        }  
        
        {unicodeArrayCallsWrapperName}.data = decodedValues;                             
    `;
}
