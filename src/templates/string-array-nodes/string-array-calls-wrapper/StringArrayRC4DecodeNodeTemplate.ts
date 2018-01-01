import { Utils } from '../../../utils/Utils';

/**
 * @returns {string}
 */
export function StringArrayRc4DecodeNodeTemplate (): string {
    const symTbl: { [key: string]: string } = {
        'initialized': Utils.generateIden(),
        'rc4': Utils.generateIden(),
        'data': Utils.generateIden(),
        'once': Utils.generateIden()
    };
  
    return `
        if ({stringArrayCallsWrapperName}.${symTbl.initialized} === undefined) {
            {atobPolyfill}
            
            {rc4Polyfill}
            {stringArrayCallsWrapperName}.${symTbl.rc4} = rc4;
            
            {stringArrayCallsWrapperName}.${symTbl.data} = {};
            
            {stringArrayCallsWrapperName}.${symTbl.initialized} = true;
        }
  
        var cachedValue = {stringArrayCallsWrapperName}.${symTbl.data}[index];

        if (cachedValue === undefined) {
            if ({stringArrayCallsWrapperName}.${symTbl.once} === undefined) {
                {selfDefendingCode}
                
                {stringArrayCallsWrapperName}.${symTbl.once} = true;
            }
            
            value = {stringArrayCallsWrapperName}.${symTbl.rc4}(value, key);
            {stringArrayCallsWrapperName}.${symTbl.data}[index] = value;
        } else {
            value = cachedValue;
        }
    `;
}
