import { injectable, } from 'inversify';

import { AtobTemplate } from './templates/string-array-calls-wrapper/AtobTemplate';
import { Rc4Template } from './templates/string-array-calls-wrapper/Rc4Template';
import { StringArrayRC4DecodeTemplate } from './templates/string-array-calls-wrapper/StringArrayRC4DecodeTemplate';

import { StringArrayCallsWrapperCodeHelper } from './StringArrayCallsWrapperCodeHelper';

@injectable()
export class StringArrayCallsWrapperRc4CodeHelper extends StringArrayCallsWrapperCodeHelper {
    /**
     * @returns {string}
     */
    protected getDecodeStringArrayTemplate (): string {
        const atobFunctionName: string = this.randomGenerator.getRandomString(6);

        const atobPolyfill: string = this.customCodeHelperFormatter.formatTemplate(AtobTemplate(), {
            atobFunctionName
        });
        const rc4Polyfill: string = this.customCodeHelperFormatter.formatTemplate(Rc4Template(), {
            atobFunctionName
        });

        const selfDefendingCode: string = this.getSelfDefendingTemplate();

        return this.customCodeHelperFormatter.formatTemplate(
            StringArrayRC4DecodeTemplate(this.randomGenerator),
            {
                atobPolyfill,
                rc4Polyfill,
                selfDefendingCode,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
            }
        );
    }
}
