import { alphabetStringUppercase } from '../../../../constants/AlphabetStringUppercase';
import { alphabetString } from '../../../../constants/AlphabetString';
import { numbersString } from '../../../../constants/NumbersString';

/**
 * @returns {string}
 */
export function AtobTemplate (): string {
    // swapped lowercase and uppercase groups of alphabet to prevent easy decode!!!!
    return `
        var {atobFunctionName} = function (input) {
            const chars = '${alphabetString}${alphabetStringUppercase}${numbersString}+/=';

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
        };
    `;
}
