/**
 * @returns {string}
 */
export function Rc4Template (): string {
    return `
        var rc4 = function (str, key) {
	        var s = [], j = 0, x, res = '';
	        
	        if (!rc4.s) {
                for (var i = 0; i < 256; i++) {
                    s[i] = i;
                }
                
                rc4.s = s;
	        } else {
	            s = rc4.s.slice(0);
	        }
            
            for (i = 0; i < 256; i++) {
                j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
                x = s[i];
                s[i] = s[j];
                s[j] = x;
            }
            
            i = 0;
            j = 0;
            
            for (var y = 0; y < str.length; y++) {
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
