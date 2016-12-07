import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { IOptions } from '../../../interfaces/options/IOptions';

import { initializable } from '../../../decorators/Initializable';

import { BinaryExpressionFunctionTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionFunctionTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { Utils } from '../../../Utils';

@injectable()
export class BinaryExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private operator: string;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param operator
     */
    initialize (operator: string): void {
        this.operator = operator;
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        return format(BinaryExpressionFunctionTemplate(), {
            functionName: Utils.getRandomVariableName(1),
            operator: this.operator
        });
    }
}
