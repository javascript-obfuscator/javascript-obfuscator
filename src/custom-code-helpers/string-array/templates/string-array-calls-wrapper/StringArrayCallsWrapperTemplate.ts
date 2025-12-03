/**
 * @returns {string}
 */
export function StringArrayCallsWrapperTemplate(): string {
    return `
        function {stringArrayCallsWrapperName} (index, key) {
            index = index - {indexShiftAmount};

            const stringArray = {stringArrayFunctionName}();
            let value = stringArray[index];
                
            {decodeCodeHelperTemplate}

            return value;
        }
    `;
}
