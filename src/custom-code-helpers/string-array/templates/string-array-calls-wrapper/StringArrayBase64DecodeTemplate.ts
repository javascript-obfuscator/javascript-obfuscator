import { IRandomGenerator } from '../../../../interfaces/utils/IRandomGenerator';

/**
 * @param {IRandomGenerator} randomGenerator
 * @returns {string}
 * @constructor
 */
export function StringArrayBase64DecodeTemplate (
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
                const string = {atobFunctionName}(str);
                let newStringChars = [];
                
                for (let i = 0, length = string.length; i < length; i++) {
                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
            };
            
            {stringArrayCallsWrapperName}.${dataIdentifier} = {};
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
                  
        const firstValue = {stringArrayName}[0];
        const cacheKey = index + firstValue;
        const cachedValue = {stringArrayCallsWrapperName}.${dataIdentifier}[cacheKey];
                        
        if (cachedValue === undefined) {
            {selfDefendingCode}
            
            value = {stringArrayCallsWrapperName}.${base64DecodeFunctionIdentifier}(value);
            {stringArrayCallsWrapperName}.${dataIdentifier}[cacheKey] = value;
        } else {
            value = cachedValue;
        }
    `;
}
