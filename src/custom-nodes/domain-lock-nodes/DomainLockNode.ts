import * as ESTree from 'estree';

import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

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
            blockScopeNode.body,
            this.getNode(),
            CustomNodeAppender.getStackTraceIndexByThreshold(stackTraceData.length)
        );
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
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
