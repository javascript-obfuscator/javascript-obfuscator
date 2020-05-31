import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

import { initializable } from '../../decorators/Initializable';

import { SelfDefendingTemplate } from './templates/SelfDefendingTemplate';
import { SelfDefendingNoEvalTemplate } from './templates/SelfDefendingNoEvalTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';
import { GlobalVariableNoEvalTemplate } from '../common/templates/GlobalVariableNoEvalTemplate';

@injectable()
export class SelfDefendingUnicodeCodeHelper extends AbstractCustomCodeHelper {
    /**
     * @type {string}
     */
    @initializable()
    private callsControllerFunctionName!: string;

    /**
     * @type {string}
     */
    @initializable()
    private selfDefendingFunctionName!: string;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {ICustomCodeHelperObfuscator} customCodeHelperObfuscator
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.ICustomCodeHelperObfuscator) customCodeHelperObfuscator: ICustomCodeHelperObfuscator,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            customCodeHelperFormatter,
            customCodeHelperObfuscator,
            randomGenerator,
            options
        );
    }

    /**
     * @param {string} callsControllerFunctionName
     * @param {string} selfDefendingFunctionName
     */
    public initialize (callsControllerFunctionName: string, selfDefendingFunctionName: string): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
        this.selfDefendingFunctionName = selfDefendingFunctionName;
    }

    /**
     * @param {string} codeHelperTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure (codeHelperTemplate: string): TStatement[] {
        return NodeUtils.convertCodeToStructure(codeHelperTemplate);
    }

    /**
     * @returns {string}
     */
    protected getCodeHelperTemplate (): string {
        const globalVariableTemplate: string = this.options.target !== ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate();
        const selfDefendingTemplate: string = this.options.target !== ObfuscationTarget.BrowserNoEval
            ? SelfDefendingTemplate()
            : SelfDefendingNoEvalTemplate();

        return this.customCodeHelperFormatter.formatTemplate(selfDefendingTemplate, {
            callControllerFunctionName: this.callsControllerFunctionName,
            selfDefendingFunctionName: this.selfDefendingFunctionName,
            globalVariableTemplate
        });
    }
}
