import { IRandomGenerator } from '../../../../interfaces/utils/IRandomGenerator';

/**
 * @param {IRandomGenerator} randomGenerator
 * @returns {string}
 * @constructor
 */
export function StringArrayRC4DecodeTemplate (
    randomGenerator: IRandomGenerator
): string {
    const identifierLength: number = 6;
    const initializedIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const rc4Identifier: string = randomGenerator.getRandomString(identifierLength);
    const dataIdentifier: string = randomGenerator.getRandomString(identifierLength);
    const onceIdentifier: string = randomGenerator.getRandomString(identifierLength);
  
    return `
        if ({stringArrayCallsWrapperName}.${initializedIdentifier} === undefined) {
            {atobPolyfill}
            
            {rc4Polyfill}
            {stringArrayCallsWrapperName}.${rc4Identifier} = rc4;
            
            {stringArrayCallsWrapperName}.${dataIdentifier} = {};
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
  
        const cachedValue = {stringArrayCallsWrapperName}.${dataIdentifier}[index];

        if (cachedValue === undefined) {
            if ({stringArrayCallsWrapperName}.${onceIdentifier} === undefined) {
                {selfDefendingCode}
                
                {stringArrayCallsWrapperName}.${onceIdentifier} = true;
            }
            
            value = {stringArrayCallsWrapperName}.${rc4Identifier}(value, key);
            {stringArrayCallsWrapperName}.${dataIdentifier}[index] = value;
        } else {
            value = cachedValue;
        }
    `;
}
