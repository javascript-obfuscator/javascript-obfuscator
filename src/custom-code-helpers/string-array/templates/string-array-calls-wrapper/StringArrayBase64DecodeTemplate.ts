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
    const base64Identifier: string = randomGenerator.getRandomString(identifierLength);

    return `
        if ({stringArrayCallsWrapperName}.${initializedIdentifier} === undefined) {
            {atobPolyfill}
            {stringArrayCallsWrapperName}.${base64Identifier} = {atobFunctionName};

            {stringArrayCacheName} = arguments;
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
                  
        const firstValue = {stringArrayName}[0];
        const cacheKey = index + firstValue;
        const cachedValue = {stringArrayCacheName}[cacheKey];
        
        if (!cachedValue) {
            {selfDefendingCode}
            
            value = {stringArrayCallsWrapperName}.${base64Identifier}(value);
            {stringArrayCacheName}[cacheKey] = value;
        } else {
            value = cachedValue;
        }
    `;
}
