/**
 * @param {boolean} compress
 * @returns {string}
 */
export function StringArrayTemplate (
    compress: boolean
): string {
    if (compress) {
        return `
            var {stringArrayName} = new Function(function(a){a=decodeURIComponent(a.split("").map(function(a){return"%"+("00"+a.charCodeAt(0).toString(16)).slice(-2)}).join(""));var e=new Map;a=(a+"").split("");for(var c=a[0],f=c,g=[c],h=256,b,d=1;d<a.length;d++)b=a[d].charCodeAt(0),b=256>b?a[d]:e.has(b)?e.get(b):f+c,g.push(b),c=b.charAt(0),e.set(h,f+c),h++,f=b;return g.join("")}("{stringArray}"));
            {selfDefendingCode}
            {stringArrayName} = {stringArrayName}();
        `;
    } else {
        return `
            function {stringArrayName} () {
                return [{stringArray}];
            }
            {selfDefendingCode}
            {stringArrayName} = {stringArrayName}();
        `;
    }
}
