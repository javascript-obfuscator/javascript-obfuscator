import { base64alphabetSwapped } from '../../../../constants/Base64AlphabetSwapped';

/**
 * @returns {string}
 */
export function AtobTemplate (): string {
    return `
        var {atobFunctionName} = function (input) {
            const chars = '${base64alphabetSwapped}';

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
