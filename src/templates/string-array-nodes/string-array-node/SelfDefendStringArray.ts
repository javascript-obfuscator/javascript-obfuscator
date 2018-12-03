import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

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
    const iterVar: string = randomGenerator.getRandomString(identifierLength);
    const iterVar2: string = randomGenerator.getRandomString(identifierLength);
    const strVar: string = randomGenerator.getRandomString(identifierLength);
    const hashFuncName: string = randomGenerator.getRandomString(identifierLength);
    const funcToString: string = randomGenerator.getRandomString(identifierLength);

    return `
    var {stringHashName} = (function() {
        function ${hashFuncName}(${toHashVar}) {
            for (var ${iterVar} = 0,${hashVar} = 0,${iterVar2} = 5;${hashVar} ${hash ? `!` : `=`}= ${hash}; ${iterVar2}++) {
                for (${hashVar} = ${toHashVar}['split']('\\n').length-1,${iterVar} = 0, ${toHashVar}=${funcToString}();${iterVar} < ${toHashVar}.length; ${iterVar}++) {
                    var ${charVar} = ${toHashVar}['charCodeAt'](${iterVar}) ^ ${hashEntropy};
                    ${hashVar} = ((${hashVar}<<${iterVar2})-${hashVar})+${charVar};
                    ${hashVar} = ${hashVar} & ${hashVar};
                }
            }
            return ${hashVar};
        }
        function ${funcToString}() {
            var ${strVar} = {stringArrayName}['toString']().replace(/\\'/g,'').trim();
            return ${strVar}['substring'](${strVar}['indexOf']('[')-${funcToString}['toString']()['indexOf']("\\n"),${strVar}['lastIndexOf'](']'));
        }
        return ${hashFuncName}(${hashFuncName}['toString']());
    })();`;
}
