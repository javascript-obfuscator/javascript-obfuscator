import { IEscapeSequenceEncoder } from '../../../interfaces/utils/IEscapeSequenceEncoder';

/**
 * SelfDefendingTemplate. Enter code in infinity loop.
 *
 * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
 * @returns {string}
 */
export function SelfDefendingTemplate (escapeSequenceEncoder: IEscapeSequenceEncoder): string {
    return `
        var selfDefendingFunc = function () {
            var object = {
                data: {
                    key: 'cookie',
                    value: 'timeout'
                },
                setCookie: function (options, name, value, document) {
                    document = document || {};
                    
                    var updatedCookie = name + "=" + value;

                    var i = 0;
                                                            
                    for (var i = 0, len = options.length; i < len; i++) {
                        var propName = options[i];
                                     
                        updatedCookie += "; " + propName;
                        
                        var propValue = options[propName];
                        
                        options.push(propValue);
                        len = options.length;
                                                                        
                        if (propValue !== true) {
                            updatedCookie += "=" + propValue;
                        }
                    }

                    document['cookie'] = updatedCookie;
                },
                removeCookie: function(){return 'dev';},
                getCookie: function (document, name) {
                    document = document || function (value) { return value };
                    var matches = document(new RegExp(
                        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                    ));
                    
                    var func = function (param1, param2) {
                        param1(++param2);
                    };
                    
                    func({whileFunctionName}, {timesName});
                                        
                    return matches ? decodeURIComponent(matches[1]) : undefined;
                }
            };
            
            var test1 = function () {
                var regExp = new RegExp('${
                    escapeSequenceEncoder.encode(`\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}`, true)
                }');
                
                return regExp.test(object.removeCookie.toString());
            };
            
            object['updateCookie'] = test1;
            
            var cookie = '';
            var result = object['updateCookie']();
                                    
            if (!result) {
                object['setCookie'](['*'], 'counter', 1);
            } else if (result) {
                cookie = object['getCookie'](null, 'counter');
            } else {
                object['removeCookie']();
            }
        };
        
        selfDefendingFunc();
    `;
}
