/**
 * @returns {string}
 */
export function SingleNodeCallControllerTemplate (): string {
    return `
        const {singleNodeCallControllerFunctionName} = (function(){
            let firstCall = true;
            
            return function (context, fn){
                const rfn = firstCall ? function(){
                    if(fn){
                        const res = fn.apply(context, arguments);
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
