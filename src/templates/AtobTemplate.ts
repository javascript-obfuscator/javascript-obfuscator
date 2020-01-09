/**
 * @returns {string}
 */
export function AtobTemplate (): string {
    return `
        (function () {
            {globalVariableTemplate}
            
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            that.atob || (
                that.atob = function(input) {
                    const str = String(input).replace(/=+$/, '');
                    let output = '';
                    for (
                        let bc = 0, bs, buffer, idx = 0;
                        buffer = str.charAt(idx++);
                        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
                    ) {
                        buffer = chars.indexOf(buffer);
                    }
                    return output;
                }
            );
        })();
    `;
}
