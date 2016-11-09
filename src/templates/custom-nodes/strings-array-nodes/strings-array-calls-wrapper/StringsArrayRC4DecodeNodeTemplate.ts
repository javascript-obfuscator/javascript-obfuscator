/**
 * @returns {string}
 */
export function StringsArrayRc4DecodeNodeTemplate (): string {
    return `
        if (!{stringsArrayCallsWrapperName}.atobPolyfillAppended) {            
            {atobPolyfill}
            
            {stringsArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
        
        if (!{stringsArrayCallsWrapperName}.rc4) {            
            {rc4Polyfill}
            
            {stringsArrayCallsWrapperName}.rc4 = rc4;
        }
                        
        if (!{stringsArrayCallsWrapperName}.data) {
            {stringsArrayCallsWrapperName}.data = {};
        }

        if ({stringsArrayCallsWrapperName}.data[index] === undefined) {
            if (!{stringsArrayCallsWrapperName}.once) {
                {selfDefendingCode}
                
                {stringsArrayCallsWrapperName}.once = true;
            }
            
            value = {stringsArrayCallsWrapperName}.rc4(value, key);
            {stringsArrayCallsWrapperName}.data[index] = value;
        } else {
            value = {stringsArrayCallsWrapperName}.data[index];
        }
    `;
}
