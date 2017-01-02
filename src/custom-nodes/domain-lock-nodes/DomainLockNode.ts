import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';

import { initializable } from '../../decorators/Initializable';

import { DomainLockNodeTemplate } from '../../templates/custom-nodes/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { CryptUtils } from '../../utils/CryptUtils';
import { NodeUtils } from '../../node/NodeUtils';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

@injectable()
export class DomainLockNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName: string;

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
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(this.getTemplate());
    }

    /**
     * @returns {string}
     */
    protected getTemplate (): string {
        const domainsString: string = this.options.domainLock.join(';');
        const [hiddenDomainsString, diff]: string[] = CryptUtils.hideString(domainsString, domainsString.length * 3);

        return format(DomainLockNodeTemplate(), {
            domainLockFunctionName: RandomGeneratorUtils.getRandomVariableName(6, true, true),
            diff: diff,
            domains: hiddenDomainsString,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
