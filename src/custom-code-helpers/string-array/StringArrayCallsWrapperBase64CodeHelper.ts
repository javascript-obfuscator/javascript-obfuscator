import { injectable, } from 'inversify';

import { AtobTemplate } from './templates/string-array-calls-wrapper/AtobTemplate';
import { StringArrayBase64DecodeTemplate } from './templates/string-array-calls-wrapper/StringArrayBase64DecodeTemplate';

import { StringArrayCallsWrapperCodeHelper } from './StringArrayCallsWrapperCodeHelper';

@injectable()
export class StringArrayCallsWrapperBase64CodeHelper extends StringArrayCallsWrapperCodeHelper {
    /**
     * @returns {string}
     */
    protected getDecodeStringArrayTemplate (): string {
        const atobFunctionName: string = this.randomGenerator.getRandomString(6);

        const atobPolyfill: string = this.customCodeHelperFormatter.formatTemplate(AtobTemplate(), {
            atobFunctionName: atobFunctionName
        });

        const selfDefendingCode: string = this.getSelfDefendingTemplate();

        return this.customCodeHelperFormatter.formatTemplate(
            StringArrayBase64DecodeTemplate(this.randomGenerator),
            {
                atobPolyfill,
                atobFunctionName,
                selfDefendingCode,
                stringArrayName: this.stringArrayName,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
            }
        );
    }
}
