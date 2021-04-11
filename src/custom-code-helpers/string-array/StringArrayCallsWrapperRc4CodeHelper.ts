import { injectable, } from 'inversify';

import { StringArrayRc4DecodeTemplate } from './templates/string-array-calls-wrapper/StringArrayRc4DecodeTemplate';

import { StringArrayCallsWrapperCodeHelper } from './StringArrayCallsWrapperCodeHelper';

@injectable()
export class StringArrayCallsWrapperRc4CodeHelper extends StringArrayCallsWrapperCodeHelper {
    /**
     * @returns {string}
     */
    protected getDecodeStringArrayTemplate (): string {
        const selfDefendingCode: string = this.getSelfDefendingTemplate();

        if (!this.stringArrayDecodeFunctionName) {
            throw new Error('Unknown name for string array decode function');
        }

        return this.customCodeHelperFormatter.formatTemplate(
            StringArrayRc4DecodeTemplate(this.randomGenerator),
            {
                selfDefendingCode,
                rc4FunctionName: this.stringArrayDecodeFunctionName,
                stringArrayName: this.stringArrayName,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
            }
        );
    }
}
