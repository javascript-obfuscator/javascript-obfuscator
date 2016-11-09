/**
 * @returns {string}
 */
export function StringArrayRc4DecodeNodeTemplate (): string {
    return `
        if (!{stringArrayCallsWrapperName}.atobPolyfillAppended) {            
            {atobPolyfill}
            
            {stringArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
        
        if (!{stringArrayCallsWrapperName}.rc4) {            
            {rc4Polyfill}
            
            {stringArrayCallsWrapperName}.rc4 = rc4;
        }
                        
        if (!{stringArrayCallsWrapperName}.data) {
            {stringArrayCallsWrapperName}.data = {};
        }

        if ({stringArrayCallsWrapperName}.data[index] === undefined) {
            if (!{stringArrayCallsWrapperName}.once) {
                {selfDefendingCode}
                
                {stringArrayCallsWrapperName}.once = true;
            }
            
            value = {stringArrayCallsWrapperName}.rc4(value, key);
            {stringArrayCallsWrapperName}.data[index] = value;
        } else {
            value = {stringArrayCallsWrapperName}.data[index];
        }
    `;
}
