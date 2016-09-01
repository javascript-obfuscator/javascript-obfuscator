// import { Utils } from "../../Utils";

import { INode } from "../../interfaces/nodes/INode";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { DomainLockTemplate } from "../../templates/custom-nodes/domain-lock-nodes/DomainLockTemplate";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

export class DomainLockNode extends Node {
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
     *  JSCrush version of following code
     *
     *
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        let domainsString = this.options.domainLock.join(';'),
        [hiddenDomainsString, diff] = Utils.hideString(domainsString, domainsString.length * 3);

        return NodeUtils.convertCodeToStructure(
            DomainLockTemplate().formatUnicorn({
              domains: Utils.stringToUnicode(hiddenDomainsString),
              diff: diff
            })
        );
    }
}
