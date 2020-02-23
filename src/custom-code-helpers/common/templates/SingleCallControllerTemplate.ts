/**
 * @returns {string}
 */
export function SingleCallControllerTemplate (): string {
    return `
        const {callControllerFunctionName} = (function(){
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
