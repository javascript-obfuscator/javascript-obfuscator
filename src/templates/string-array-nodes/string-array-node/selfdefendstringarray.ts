import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

/**
 * @param {IRandomGenerator} randomGenerator
 * @param {string} hash
 * @returns {string}
 * @constructor
 */
export function SelfDefendStringArrayTemplate (
    randomGenerator: IRandomGenerator,
    hash: string
): string {
    const identifierLength: number = 6;
    const hashVar: string = randomGenerator.getRandomString(identifierLength);
    const toHashVar: string = randomGenerator.getRandomString(identifierLength);
    const charVar: string = randomGenerator.getRandomString(identifierLength);
    const iterVar: string = randomGenerator.getRandomString(identifierLength);
    const strVar: string = randomGenerator.getRandomString(identifierLength);

    return `
    (function(${toHashVar}) {
    for (var ${hashVar} = 0,${iterVar} = 0;${hashVar} !== ${hash};) {
        for (${iterVar} = 0,${hashVar} = 0;${iterVar} < ${toHashVar}.length; ${iterVar}++) {
            var ${charVar} = ${toHashVar}['charCodeAt'](${iterVar});
            ${hashVar} = ((${hashVar}<<5)-${hashVar})+${charVar};
            ${hashVar} = ${hashVar} & ${hashVar};
        }
    }
    })(
        (function(${strVar}) {
            ${strVar} = ${strVar}['replace'](new RegExp('[\\\\s\\'"]','g'),'');
            return ${strVar}['substring'](${strVar}['indexOf']('[')+1,${strVar}['lastIndexOf'](']'));
        })({stringArrayName}['toString']())
    );`;
}
