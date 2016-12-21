import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';

import { initializable } from '../../decorators/Initializable';

import { DebugProtectionFunctionCallTemplate } from '../../templates/custom-nodes/debug-protection-nodes/debug-protection-function-call-node/DebufProtectionFunctionCallTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class DebugProtectionFunctionCallNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private debugProtectionFunctionName: string;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param debugProtectionFunctionName
     */
    public initialize (debugProtectionFunctionName: string): void {
        this.debugProtectionFunctionName = debugProtectionFunctionName;
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
        return format(DebugProtectionFunctionCallTemplate(), {
            debugProtectionFunctionName: this.debugProtectionFunctionName
        });
    }
}
