import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { NumberUtils } from '../../../utils/NumberUtils';

/**
 * @param {IRandomGenerator} randomGenerator
 * @param {string} hash
 * @returns {string}
 * @constructor
 */
export function SelfDefendStringArrayTemplate (
    randomGenerator: IRandomGenerator,
    hash: string,
    hashEntropy: number
): string {
    const identifierLength: number = 6;
    const hashVar: string = randomGenerator.getRandomString(identifierLength);
    const toHashVar: string = randomGenerator.getRandomString(identifierLength);
    const charVar: string = randomGenerator.getRandomString(identifierLength);
    const iteratorVar: string = randomGenerator.getRandomString(identifierLength);
    const iteratorVar2: string = randomGenerator.getRandomString(identifierLength);
    const strVar: string = randomGenerator.getRandomString(identifierLength);
    const hashFuncName: string = randomGenerator.getRandomString(identifierLength);
    const funcToString: string = randomGenerator.getRandomString(identifierLength);

    return `
    var {stringHashName} = (function() {
        function ${hashFuncName}(${toHashVar}, ${iteratorVar}) {
            for (var ${hashVar} = 0,${iteratorVar2} = 0x${NumberUtils.toHex(hashEntropy)};${hashVar} ${hash ? `!` : `=`}= ${hash}; ${iteratorVar2}++) {
                for (${hashVar} = ${toHashVar}['split']('\\n')['length']-1,${iteratorVar} = 0, ${toHashVar}=${funcToString}();${iteratorVar} < ${toHashVar}['length']; ${iteratorVar}++) {
                    var ${charVar} = ${toHashVar}['charCodeAt'](${iteratorVar}) ^ ${iteratorVar2};
                    ${hashVar} = ((${hashVar}<<(${iteratorVar2} ^ 0x${NumberUtils.toHex(hashEntropy ^ 5)}))-${hashVar})+${charVar};
                    ${hashVar} = ${hashVar} & ${hashVar};
                }
            }
            return ${hashVar};
        }
        function ${funcToString}() {
            var ${strVar} = {stringArrayName}['toString']()['replace'](/\\'/g,'')['trim']();
            return ${strVar}['substring'](${strVar}['indexOf']('[')-${funcToString}['toString']()['indexOf']('\\n'),${strVar}['lastIndexOf'](']'));
        }
        return ${hashFuncName}(${hashFuncName}['toString']());
    })();`;
}
