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
            
            {stringArrayCacheName} = arguments;
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
                  
        const firstValue = {stringArrayName}[0];
        const cacheKey = index + firstValue;
        const cachedValue = {stringArrayCacheName}[cacheKey];
        
        if (!cachedValue) {
            {selfDefendingCode}
            
            value = {stringArrayCallsWrapperName}.${base64DecodeFunctionIdentifier}(value);
            {stringArrayCacheName}[cacheKey] = value;
        } else {
            value = cachedValue;
        }
    `;
}
