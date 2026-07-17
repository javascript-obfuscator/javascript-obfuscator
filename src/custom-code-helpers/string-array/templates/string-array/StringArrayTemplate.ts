/**
 * @returns {string}
 */
export function StringArrayTemplate(selfDefending: boolean): string {
    return `
        function {imageClassName} ({paramWidthName}, {paramHeightName}) {
            this.width = {paramWidthName};
            this.height = {paramHeightName};
            this.append = function(){
                {atobPolyfill}
                this.srcset = JSON.parse({atobFunctionName}(this.src.substr({paramWidthName})));
            };
        }
    
        function {stringArrayFunctionName} () {
            const {imageInstanceName} = new {imageClassName}({imageWidth}, {imageHeight});
            {imageInstanceName}.src = {imageSrc};
            {imageInstanceName}.append();
            
            {stringArrayFunctionName} = function () {
                return {imageInstanceName}.srcset;
            };
            
            return {imageInstanceName}.srcset;
        }
    `;
}
