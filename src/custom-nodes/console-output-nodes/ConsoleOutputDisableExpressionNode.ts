import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

import { ConsoleOutputDisableExpressionTemplate } from '../../templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate';
import { GlobalVariableNoEvalTemplate } from '../../templates/GlobalVariableNoEvalTemplate';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';
import { TIdentifierNameGeneratorFactory } from '../../types/container/generators/TIdentifierNameGeneratorFactory';

@injectable()
export class ConsoleOutputDisableExpressionNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private callsControllerFunctionName: string;

    /**
     * @param {TIdentifierNameGeneratorFactory} identifierNameGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNameGenerator)
            identifierNameGeneratorFactory: TIdentifierNameGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNameGeneratorFactory, randomGenerator, options);
    }

    /**
     * @param {string} callsControllerFunctionName
     */
    public initialize (callsControllerFunctionName: string): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(this.getTemplate());
    }

    /**
     * @returns {string}
     */
    protected getTemplate (): string {
        const globalVariableTemplate: string = this.options.target !== ObfuscationTarget.Extension
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate();

        return format(ConsoleOutputDisableExpressionTemplate(), {
            consoleLogDisableFunctionName: this.identifierNameGenerator.generate(6),
            globalVariableTemplate,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
