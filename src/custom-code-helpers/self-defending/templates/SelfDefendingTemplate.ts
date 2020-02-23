import { IEscapeSequenceEncoder } from '../../../interfaces/utils/IEscapeSequenceEncoder';

/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 * Notice, that second and third call to recursiveFunc1('indexOf') has cyrillic `е` character instead latin
 *
 * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
 * @returns {string}
 */
export function SelfDefendingTemplate (escapeSequenceEncoder: IEscapeSequenceEncoder): string {
    return `
        const {selfDefendingFunctionName} = {callControllerFunctionName}(this, function () {
            const test = function () {
                const regExp = test
                    .constructor('return /" + this + "/')()
                    .compile('^([^ ]+( +[^ ]+)+)+[^ ]}');
                
                return !regExp.test({selfDefendingFunctionName});
            };
            
            return test();
        });
        
        {selfDefendingFunctionName}();
    `;
}
