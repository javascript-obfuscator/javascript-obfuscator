import { IRandomGenerator } from '../../../../interfaces/utils/IRandomGenerator';

/**
 * @param {IRandomGenerator} randomGenerator
 * @returns {string}
 * @constructor
 */
export function StringArrayBase64DecodeTemplate(randomGenerator: IRandomGenerator): string {
    const identifierLength: number = 6;
    const initializedIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const base64Identifier: string = randomGenerator.getRandomString(identifierLength);
    const dataIdentifier: string = randomGenerator.getRandomString(identifierLength);

    return `
        if ({stringArrayCallsWrapperName}.${initializedIdentifier} === undefined) {
            {atobPolyfill}
            {stringArrayCallsWrapperName}.${base64Identifier} = {atobFunctionName};

            {stringArrayCallsWrapperName}.${dataIdentifier} = {};
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
                  
        const firstValue = stringArray[0];
        const cacheKey = index + firstValue;
        const cachedValue = {stringArrayCallsWrapperName}.${dataIdentifier}[cacheKey];
        
        if (!cachedValue) {
            {selfDefendingCode}
            
            value = {stringArrayCallsWrapperName}.${base64Identifier}(value);
            {stringArrayCallsWrapperName}.${dataIdentifier}[cacheKey] = value;
        } else {
            value = cachedValue;
        }
    `;
}
