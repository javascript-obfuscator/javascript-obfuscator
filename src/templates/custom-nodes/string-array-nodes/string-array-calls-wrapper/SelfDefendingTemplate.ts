import { IEscapeSequenceEncoder } from '../../../../interfaces/utils/IEscapeSequenceEncoder';

/**
 * @returns {string}
 */
export function SelfDefendingTemplate (escapeSequenceEncoder: IEscapeSequenceEncoder): string {
    return `
        var StatesClass = function (rc4Bytes) {
            this.rc4Bytes = rc4Bytes;
            this.states = [1, 0, 0];
            this.newState = function(){return 'newState';};
            this.firstState = '${
                escapeSequenceEncoder.encode(`\\w+ *\\(\\) *{\\w+ *`, true)
            }';
            this.secondState = '${
                escapeSequenceEncoder.encode(`['|"].+['|"];? *}`, true)
            }';
        };
        
        StatesClass.prototype.checkState = function () {
            var regExp = new RegExp(this.firstState + this.secondState);

            return this.runState(regExp.test(this.newState.toString()) ? --this.states[1] : --this.states[0]);
        };
        
        StatesClass.prototype.runState = function (stateResult) {
            if (!Boolean(~stateResult)) {
                return stateResult;
            }
            
            return this.getState(this.rc4Bytes);
        };

        StatesClass.prototype.getState = function (rc4Bytes) {
            for (var i = 0, len = this.states.length; i < len; i++) {
                this.states.push(Math.round(Math.random()));
                len = this.states.length;
            }
            
            return rc4Bytes(this.states[0]);
        };

        new StatesClass({stringArrayCallsWrapperName}).checkState();
    `;
}
