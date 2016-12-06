import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

import { IOptions } from '../../interfaces/options/IOptions';

import { ObfuscationEvents } from '../../enums/ObfuscationEvents';

import { ConsoleOutputDisableExpressionTemplate } from '../../templates/custom-nodes/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { Utils } from '../../Utils';

@injectable()
export class ConsoleOutputDisableExpressionNode extends AbstractCustomNode {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvents.BeforeObfuscation;

    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName: string;

    /**
     * @type {string}
     */
    protected readonly groupName: string = 'consoleOutputDisableExpressionNode';

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param callsControllerFunctionName
     */
    public initialize (callsControllerFunctionName: string): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        return format(ConsoleOutputDisableExpressionTemplate(), {
            consoleLogDisableFunctionName: Utils.getRandomVariableName(),
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
