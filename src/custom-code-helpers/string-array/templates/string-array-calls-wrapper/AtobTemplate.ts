import { alphabetStringUppercase } from '../../../../constants/AlphabetStringUppercase';
import { alphabetString } from '../../../../constants/AlphabetString';
import { numbersString } from '../../../../constants/NumbersString';

/**
 * @returns {string}
 */
export function AtobTemplate (): string {
    return `
        (function () {
            {globalVariableTemplate}
            
            const chars = '${alphabetStringUppercase}${alphabetString}${numbersString}+/=';

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
