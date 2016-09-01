import { IOptions } from "../interfaces/IOptions";

import { DomainLockNode } from "../custom-nodes/domain-lock-nodes/DomainLockNode";
import { NodesGroup } from './NodesGroup';

export class DomainLockNodesGroup extends NodesGroup {
    /**
     * @param options
     */
    constructor (options: IOptions) {
        super(options);

        if (this.options.domainLock.length === 0) {
            return;
        }

        this.nodes.set(
            'DomainLockNode',
            new DomainLockNode(this.options)
        );
    }
}
