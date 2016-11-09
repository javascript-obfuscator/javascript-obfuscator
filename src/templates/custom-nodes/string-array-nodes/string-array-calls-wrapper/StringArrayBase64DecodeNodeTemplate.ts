/**
 * @returns {string}
 */
export function StringArrayBase64DecodeNodeTemplate (): string {
    return `      
        if (!{stringArrayCallsWrapperName}.atobPolyfillAppended) {
            {atobPolyfill}
            
            {stringArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
        
        if (!{stringArrayCallsWrapperName}.base64DecodeUnicode) {                
            {stringArrayCallsWrapperName}.base64DecodeUnicode = function (str) {
                var string = atob(str);
                var newStringChars = [];
                
                for (var i = 0, length = string.length; i < length; i++) {
                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
            };
        }
        
        if (!{stringArrayCallsWrapperName}.data) {
            {stringArrayCallsWrapperName}.data = {};
        }
                        
        if (!{stringArrayCallsWrapperName}.data[index]) {
            {selfDefendingCode}
            
            value = {stringArrayCallsWrapperName}.base64DecodeUnicode(value);
            {stringArrayCallsWrapperName}.data[index] = value;
        } else {
            value = {stringArrayCallsWrapperName}.data[index];
        }  
    `;
}
