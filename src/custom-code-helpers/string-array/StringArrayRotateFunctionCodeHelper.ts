import type { Expression } from 'estree';
import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { StringArrayRotateFunctionTemplate } from './templates/string-array-rotate-function/StringArrayRotateFunctionTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayRotateFunctionCodeHelper extends AbstractCustomCodeHelper {
    /**
     * @type {number}
     */
    @initializable()
    private comparisonValue!: number;

    /**
     * @type {Expression}
     */
    @initializable()
    private comparisonExpressionNode!: Expression;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayName!: string;

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
     * @param {string} stringArrayName
     * @param {number} comparisonValue
     * @param {Expression} comparisonExpressionNode
     */
    public initialize (
        stringArrayName: string,
        comparisonValue: number,
        comparisonExpressionNode: Expression
    ): void {
        this.stringArrayName = stringArrayName;
        this.comparisonValue = comparisonValue;
        this.comparisonExpressionNode = comparisonExpressionNode;
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
        const comparisonExpressionCode: string = NodeUtils.convertStructureToCode([this.comparisonExpressionNode]);

        return this.customCodeHelperFormatter.formatTemplate(
            StringArrayRotateFunctionTemplate(),
            {
                comparisonExpressionCode,
                comparisonValue: this.comparisonValue,
                stringArrayName: this.stringArrayName
            }
        );
    }
}
