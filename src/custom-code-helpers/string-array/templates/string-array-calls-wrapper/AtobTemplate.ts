import { base64alphabetSwapped } from '../../../../constants/Base64AlphabetSwapped';

/**
 * This atob logic completely ignores padding characters
 *
 * @returns {string}
 */
export function AtobTemplate (): string {
    return `
        var {atobFunctionName} = function (input) {
            const chars = '${base64alphabetSwapped}';

            let output = '';
            for (
                let bc = 0, bs, buffer, idx = 0;
                buffer = input.charAt(idx++);
                ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
            ) {
                buffer = chars.indexOf(buffer);
            }
            return output;
        };
    `;
}
