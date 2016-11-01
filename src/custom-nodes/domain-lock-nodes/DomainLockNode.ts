import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../../enums/AppendState';

import { DomainLockNodeTemplate } from '../../templates/custom-nodes/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { CustomNodeAppender } from '../CustomNodeAppender';
import { NodeUtils } from '../../NodeUtils';
import { Utils } from '../../Utils';

export class DomainLockNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        CustomNodeAppender.appendNode(
            stackTraceData,
            blockScopeNode,
            this.getNode(),
            CustomNodeAppender.getRandomStackTraceIndex(stackTraceData.length)
        );
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        let domainsString: string = this.options.domainLock.join(';'),
            [hiddenDomainsString, diff]: string[] = Utils.hideString(domainsString, domainsString.length * 3);

        return NodeUtils.convertCodeToStructure(
            DomainLockNodeTemplate().formatUnicorn({
                diff: diff,
                domains: hiddenDomainsString
            })
        );
    }
}
