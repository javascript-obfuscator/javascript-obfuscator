/**
 * @returns {string}
 */
export function TemplateObjectTemplate (): string {
    return `
        function {templateObjectHelperName} () {
            const data = {taggedTemplateLiteralHelperName}([{templateObjectValues}], [{templateObjectRawValues}]);
            
            {templateObjectHelperName} = function() {
                return data;
            };
            
            return data;
        }
    `;
}
