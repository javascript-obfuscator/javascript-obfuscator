/**
 * @returns {string}
 */
export function StringArrayBase64DecodeNodeTemplate (): string {
    return `      
        if ({stringArrayCallsWrapperName}.initialized === undefined) {
            {atobPolyfill}
            
            {stringArrayCallsWrapperName}.base64DecodeUnicode = function (str) {
                var string = atob(str);
                var newStringChars = [];
                
                for (var i = 0, length = string.length; i < length; i++) {
                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
            };
            
            {stringArrayCallsWrapperName}.data = {};
            
            {stringArrayCallsWrapperName}.initialized = true;
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
