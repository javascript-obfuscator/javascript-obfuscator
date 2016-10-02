import * as ESTree from 'estree';

import 'format-unicorn';

import { TNodeWithBlockStatement } from 'app/types/TNodeWithBlockStatement';

import { AppendState } from 'app/enums/AppendState';

import { DomainLockNodeTemplate } from 'app/templates/custom-nodes/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate';

import { AbstractCustomNode } from 'app/custom-nodes/AbstractCustomNode';
import { NodeUtils } from 'app/NodeUtils';
import { Utils } from 'app/Utils';

export class DomainLockNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        NodeUtils.prependNode(blockScopeNode.body, this.getNode());
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
