/**
 * @returns {string}
 */
export function SingleNodeCallControllerTemplate (): string {
    return `
        var {singleNodeCallControllerFunctionName} = (function(){
            var firstCall = true;
            
            return function (context, fn){
                var rfn = firstCall ? function(){
                    if(fn){
                        var res = fn.apply(context, arguments);
                        fn = null;
                        return res;
                    }
                } : function(){}
                
                firstCall = false;
                
                return rfn;
            }
        })();
    `;
}
