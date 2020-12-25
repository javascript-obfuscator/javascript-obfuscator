import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { initializable } from '../../decorators/Initializable';

import { SingleCallControllerTemplate } from '../common/templates/SingleCallControllerTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class CallsControllerFunctionCodeHelper extends AbstractCustomCodeHelper {
    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName!: string;

    /**
     * @type {NodeTransformationStage}
     */
    @initializable()
    private nodeTransformationStage!: NodeTransformationStage;

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
     * @param {NodeTransformationStage} nodeTransformationStage
     * @param {string} callsControllerFunctionName
     */
    public initialize (nodeTransformationStage: NodeTransformationStage, callsControllerFunctionName: string): void {
        this.nodeTransformationStage = nodeTransformationStage;
        this.callsControllerFunctionName = callsControllerFunctionName;
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
        if (this.nodeTransformationStage === NodeTransformationStage.Finalizing) {
            return this.customCodeHelperObfuscator.obfuscateTemplate(
                this.customCodeHelperFormatter.formatTemplate(SingleCallControllerTemplate(), {
                    callControllerFunctionName: this.callsControllerFunctionName
                })
            );
        }

        return this.customCodeHelperFormatter.formatTemplate(SingleCallControllerTemplate(), {
            callControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
