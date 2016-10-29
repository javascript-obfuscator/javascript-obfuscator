/**
 * @returns {string}
 */
export function UnicodeArrayAtobDecodeNodeTemplate (): string {
    return `        
        {atobPolyfill}
                
        var decodedValues = {unicodeArrayCallsWrapperName}.data || {};
        
        var {decodeFunctionName} = function (decodedValues, index, value) {
            if (!decodedValues[index]) {
                value = decodeURI(atob(value));
                decodedValues[index] = value;
            } else {
                value = decodedValues[index];
            }  
            
            {unicodeArrayCallsWrapperName}.data = decodedValues;
                                    
            return value;
        }
        
        {code}
    `;
}
