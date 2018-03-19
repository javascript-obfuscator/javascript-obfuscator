import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import format from 'string-template';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

import { ConsoleOutputDisableExpressionTemplate } from '../../templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate';
import { GlobalVariableNoEvalTemplate } from '../../templates/GlobalVariableNoEvalTemplate';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class ConsoleOutputDisableExpressionNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private callsControllerFunctionName!: string;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
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
        const globalVariableTemplate: string = this.options.target !== ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate();

        return format(ConsoleOutputDisableExpressionTemplate(), {
            consoleLogDisableFunctionName: this.identifierNamesGenerator.generate(),
            globalVariableTemplate,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
