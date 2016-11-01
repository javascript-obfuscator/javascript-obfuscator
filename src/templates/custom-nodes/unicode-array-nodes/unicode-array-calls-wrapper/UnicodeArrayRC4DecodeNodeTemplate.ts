/**
 * @returns {string}
 */
export function UnicodeArrayRc4DecodeNodeTemplate (): string {
    return `
        if (!{unicodeArrayCallsWrapperName}.atobPolyfillAppended) {            
            {atobPolyfill}
            
            {unicodeArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
        
        if (!{unicodeArrayCallsWrapperName}.rc4) {            
            {rc4Polyfill}
            
            {unicodeArrayCallsWrapperName}.rc4 = rc4;
        }
                        
        if (!{unicodeArrayCallsWrapperName}.data) {
            {unicodeArrayCallsWrapperName}.data = {};
        }

        if ({unicodeArrayCallsWrapperName}.data[index] === undefined) {
            if (!{unicodeArrayCallsWrapperName}.once) {
                {selfDefendingCode}
                
                {unicodeArrayCallsWrapperName}.once = true;
            }
            
            value = {unicodeArrayCallsWrapperName}.rc4(value, key);
            {unicodeArrayCallsWrapperName}.data[index] = value;
        } else {
            value = {unicodeArrayCallsWrapperName}.data[index];
        }
    `;
}
