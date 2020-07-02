/**
 * @returns {string}
 */
export function Rc4Template (): string {
    return `
        const rc4 = function (str, key) {
            let s = [], j = 0, x, res = '', newStr = '';
           
            str = {atobFunctionName}(str);
                
            for (let k = 0, length = str.length; k < length; k++) {
                newStr += '%' + ('00' + str.charCodeAt(k).toString(16)).slice(-2);
            }
        
            str = decodeURIComponent(newStr);
                    	     
            let i;
                    	        
            for (i = 0; i < 256; i++) {
                s[i] = i;
            }
 
            for (i = 0; i < 256; i++) {
                j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
                x = s[i];
                s[i] = s[j];
                s[j] = x;
            }
            
            i = 0;
            j = 0;
            
            for (let y = 0; y < str.length; y++) {
                i = (i + 1) % 256;
                j = (j + s[i]) % 256;
                x = s[i];
                s[i] = s[j];
                s[j] = x;
                res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
            }
                      
            return res;
        }
    `;
}
