/**
 * @returns {string}
 */
export function StringArrayRc4DecodeNodeTemplate (): string {
    return `
        if ({stringArrayCallsWrapperName}.initialized === undefined) {
            {atobPolyfill}
            
            {rc4Polyfill}
            {stringArrayCallsWrapperName}.rc4 = rc4;
            
            {stringArrayCallsWrapperName}.data = {};
            
            {stringArrayCallsWrapperName}.initialized = true;
        }
  
        var cachedValue = {stringArrayCallsWrapperName}.data[index];

        if (cachedValue === undefined) {
            if ({stringArrayCallsWrapperName}.once === undefined) {
                {selfDefendingCode}
                
                {stringArrayCallsWrapperName}.once = true;
            }
            
            value = {stringArrayCallsWrapperName}.rc4(value, key);
            {stringArrayCallsWrapperName}.data[index] = value;
        } else {
            value = cachedValue;
        }
    `;
}
