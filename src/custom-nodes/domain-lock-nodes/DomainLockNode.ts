import 'format-unicorn';

import { INode } from "../../interfaces/nodes/INode";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { DomainLockNodeTemplate } from "../../templates/custom-nodes/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate";

import { AbstractCustomNode } from "../AbstractCustomNode";
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

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
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        let domainsString = this.options.domainLock.join(';'),
            [hiddenDomainsString, diff] = Utils.hideString(domainsString, domainsString.length * 3);

        return NodeUtils.convertCodeToStructure(
            DomainLockNodeTemplate().formatUnicorn({
                diff: diff,
                domains: hiddenDomainsString
            })
        );
    }
}
