/**
 * @returns {string}
 */
export function StringsArrayBase64DecodeNodeTemplate (): string {
    return `      
        if (!{stringsArrayCallsWrapperName}.atobPolyfillAppended) {
            {atobPolyfill}
            
            {stringsArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
        
        if (!{stringsArrayCallsWrapperName}.base64DecodeUnicode) {                
            {stringsArrayCallsWrapperName}.base64DecodeUnicode = function (str) {
                var string = atob(str);
                var newStringChars = [];
                
                for (var i = 0, length = string.length; i < length; i++) {
                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
            };
        }
        
        if (!{stringsArrayCallsWrapperName}.data) {
            {stringsArrayCallsWrapperName}.data = {};
        }
                        
        if (!{stringsArrayCallsWrapperName}.data[index]) {
            {selfDefendingCode}
            
            value = {stringsArrayCallsWrapperName}.base64DecodeUnicode(value);
            {stringsArrayCallsWrapperName}.data[index] = value;
        } else {
            value = {stringsArrayCallsWrapperName}.data[index];
        }  
    `;
}
