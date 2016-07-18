import { NO_CUSTOM_NODES_PRESET } from "../../../../preset-options/NoCustomNodesPreset";

import { AtobTemplate } from "../../AtobTemplate";

import { JavaScriptObfuscator } from '../../../../JavaScriptObfuscator';
import { Utils } from "../../../../Utils";

/**
 * @param code
 * @param unicodeArrayName
 * @param forLoopFunctionName
 * @returns {string}
 */
export function UnicodeArrayDecodeTemplate (code: string, unicodeArrayName: string, forLoopFunctionName: string): string {
    let indexVariableName: string = Utils.getRandomVariableName(),
        tempArrayName: string = Utils.getRandomVariableName();

    return `
        (function () {
            ${JavaScriptObfuscator.obfuscate(AtobTemplate(), NO_CUSTOM_NODES_PRESET).getObfuscatedCode()}
          
            var ${forLoopFunctionName} = function () {
                var ${tempArrayName} = [];
                
                for (var ${indexVariableName} in ${unicodeArrayName}) {
                    ${tempArrayName}[${Utils.stringToUnicode('push')}](decodeURI(atob(${unicodeArrayName}[${indexVariableName}])));
                }
                
                ${unicodeArrayName} = ${tempArrayName};
            };
            
            ${code}
        })();
    `;
}
