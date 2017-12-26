import { IEscapeSequenceEncoder } from '../../../interfaces/utils/IEscapeSequenceEncoder';
import { Utils } from '../../../utils/Utils';

/**
 * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
 * @returns {string}
 */
export function SelfDefendingTemplate (escapeSequenceEncoder: IEscapeSequenceEncoder): string {
    const symTbl: { [key: string]: string } = {
        'rc4Bytes': Utils.generateIden(),
        'states': Utils.generateIden(),
        'newState': Utils.generateIden(),
        'firstState': Utils.generateIden(),
        'secondState': Utils.generateIden(),
        'checkState': Utils.generateIden(),
        'runState': Utils.generateIden(),
        'getState': Utils.generateIden(),
        'stateResult': Utils.generateIden()
    };
    
    return `
        var StatesClass = function (${symTbl.rc4Bytes}) {
            this.${symTbl.rc4Bytes} = ${symTbl.rc4Bytes};
            this.${symTbl.states} = [1, 0, 0];
            this.${symTbl.newState} = function(){return 'newState';};
            this.${symTbl.firstState} = '${
                escapeSequenceEncoder.encode(`\\w+ *\\(\\) *{\\w+ *`, true)
            }';
            this.${symTbl.secondState} = '${
                escapeSequenceEncoder.encode(`['|"].+['|"];? *}`, true)
            }';
        };
        
        StatesClass.prototype.${symTbl.checkState} = function () {
            var regExp = new RegExp(this.${symTbl.firstState} + this.${symTbl.secondState});

            return this.${symTbl.runState}(regExp.test(this.${symTbl.newState}.toString()) ? --this.${symTbl.states}[1] : --this.${symTbl.states}[0]);
        };
        
        StatesClass.prototype.${symTbl.runState} = function (${symTbl.stateResult}) {
            if (!Boolean(~${symTbl.stateResult})) {
                return ${symTbl.stateResult};
            }
            
            return this.${symTbl.getState}(this.${symTbl.rc4Bytes});
        };

        StatesClass.prototype.${symTbl.getState} = function (${symTbl.rc4Bytes}) {
            for (var i = 0, len = this.${symTbl.states}.length; i < len; i++) {
                this.${symTbl.states}.push(Math.round(Math.random()));
                len = this.${symTbl.states}.length;
            }
            
            return ${symTbl.rc4Bytes}(this.${symTbl.states}[0]);
        };

        new StatesClass({stringArrayCallsWrapperName}).${symTbl.checkState}();
    `;
}
