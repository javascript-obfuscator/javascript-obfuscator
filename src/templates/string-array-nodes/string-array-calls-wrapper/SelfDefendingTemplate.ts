import { IEscapeSequenceEncoder } from '../../../interfaces/utils/IEscapeSequenceEncoder';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

/**
 * @param {IRandomGenerator} randomGenerator
 * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
 * @returns {string}
 * @constructor
 */
export function SelfDefendingTemplate (
    randomGenerator: IRandomGenerator,
    escapeSequenceEncoder: IEscapeSequenceEncoder
): string {
    const identifierLength: number = 6;
    const rc4BytesIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const statesIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const newStateIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const firstStateIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const secondStateIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const checkStateIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const runStateIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const getStateIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const stateResultIdentifier: string = randomGenerator.getRandomString(identifierLength);
    
    return `
        var StatesClass = function (${rc4BytesIdentifier}) {
            this.${rc4BytesIdentifier} = ${rc4BytesIdentifier};
            this.${statesIdentifier} = [1, 0, 0];
            this.${newStateIdentifier} = function(){return 'newState';};
            this.${firstStateIdentifier} = '${
                escapeSequenceEncoder.encode(`\\w+ *\\(\\) *{\\w+ *`, true)
            }';
            this.${secondStateIdentifier} = '${
                escapeSequenceEncoder.encode(`['|"].+['|"];? *}`, true)
            }';
        };
        
        StatesClass.prototype.${checkStateIdentifier} = function () {
            var regExp = new RegExp(this.${firstStateIdentifier} + this.${secondStateIdentifier});
            var expression = regExp.test(this.${newStateIdentifier}.toString())
                ? --this.${statesIdentifier}[1]
                : --this.${statesIdentifier}[0];
            
            return this.${runStateIdentifier}(expression);
        };
        
        StatesClass.prototype.${runStateIdentifier} = function (${stateResultIdentifier}) {
            if (!Boolean(~${stateResultIdentifier})) {
                return ${stateResultIdentifier};
            }
            
            return this.${getStateIdentifier}(this.${rc4BytesIdentifier});
        };

        StatesClass.prototype.${getStateIdentifier} = function (${rc4BytesIdentifier}) {
            for (var i = 0, len = this.${statesIdentifier}.length; i < len; i++) {
                this.${statesIdentifier}.push(Math.round(Math.random()));
                len = this.${statesIdentifier}.length;
            }
            
            return ${rc4BytesIdentifier}(this.${statesIdentifier}[0]);
        };

        new StatesClass({stringArrayCallsWrapperName}).${checkStateIdentifier}();
    `;
}
