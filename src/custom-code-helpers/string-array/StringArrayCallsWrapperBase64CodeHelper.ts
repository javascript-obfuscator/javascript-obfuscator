import { injectable, } from 'inversify';

import { StringArrayBase64DecodeTemplate } from './templates/string-array-calls-wrapper/StringArrayBase64DecodeTemplate';

import { StringArrayCallsWrapperCodeHelper } from './StringArrayCallsWrapperCodeHelper';

@injectable()
export class StringArrayCallsWrapperBase64CodeHelper extends StringArrayCallsWrapperCodeHelper {
    /**
     * @returns {string}
     */
    protected getDecodeStringArrayTemplate (): string {
        const selfDefendingCode: string = this.getSelfDefendingTemplate();

        if (!this.stringArrayDecodeFunctionName) {
            throw new Error('Unknown name for string array decode function');
        }

        return this.customCodeHelperFormatter.formatTemplate(
            StringArrayBase64DecodeTemplate(this.randomGenerator),
            {
                selfDefendingCode,
                atobFunctionName: this.stringArrayDecodeFunctionName,
                stringArrayName: this.stringArrayName,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
            }
        );
    }
}
