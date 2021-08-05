import { base64alphabetSwapped } from '../../../../constants/Base64AlphabetSwapped';

/**
 * This atob logic completely ignores padding characters
 *
 * @returns {string}
 */
export function AtobTemplate (selfDefending: boolean): string {
    return `
        var {atobFunctionName} = function (input) {
            const chars = '${base64alphabetSwapped}';

            let output = '';
            let tempEncodedString = '';
            ${selfDefending ? 'let func = output + {atobFunctionName};' : ''}
            
            for (
                let bc = 0, bs, buffer, idx = 0;
                buffer = input.charAt(idx++);
                ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4)
                    ? output += ${((): string => {
                        const basePart: string = 'String.fromCharCode(255 & bs >> (-2 * bc & 6))';
                        
                        return selfDefending
                            ? `((func.charCodeAt(idx + 10) - 10 !== 0) ? ${basePart} : bc)`
                            : basePart;
                    })()}
                    : 0
            ) {
                buffer = chars.indexOf(buffer);
            }
            
             for (let k = 0, length = output.length; k < length; k++) {
                tempEncodedString += '%' + ('00' + output.charCodeAt(k).toString(16)).slice(-2);
            }
        
            return decodeURIComponent(tempEncodedString);
        };
    `;
}
