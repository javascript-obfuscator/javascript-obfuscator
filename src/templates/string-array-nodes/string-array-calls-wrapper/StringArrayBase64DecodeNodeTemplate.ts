import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

/**
 * @param {IRandomGenerator} randomGenerator
 * @returns {string}
 * @constructor
 */
export function StringArrayBase64DecodeNodeTemplate (
    randomGenerator: IRandomGenerator
): string {
    const identifierLength: number = 6;
    const initializedIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const base64DecodeFunctionIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const dataIdentifier: string = randomGenerator.getRandomString(identifierLength);

    return `
        if ({stringArrayCallsWrapperName}.${initializedIdentifier} === undefined) {
            {atobPolyfill}
            
            {stringArrayCallsWrapperName}.${base64DecodeFunctionIdentifier} = function (str) {
                var string = atob(str);
                var newStringChars = [];
                
                for (var i = 0, length = string.length; i < length; i++) {
                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
            };
            
            {stringArrayCallsWrapperName}.${dataIdentifier} = {};
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
                  
        var cachedValue = {stringArrayCallsWrapperName}.${dataIdentifier}[index];
                        
        if (cachedValue === undefined) {
            {selfDefendingCode}
            
            value = {stringArrayCallsWrapperName}.${base64DecodeFunctionIdentifier}(value);
            {stringArrayCallsWrapperName}.${dataIdentifier}[index] = value;
        } else {
            value = cachedValue;
        }
    `;
}
