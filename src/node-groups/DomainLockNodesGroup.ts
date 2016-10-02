import { IOptions } from 'app/interfaces/IOptions';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { DomainLockNode } from 'app/custom-nodes/domain-lock-nodes/DomainLockNode';

export class DomainLockNodesGroup extends AbstractNodesGroup {
    /**
     * @param options
     */
    constructor (options: IOptions) {
        super(options);

        if (!this.options.domainLock.length) {
            return;
        }

        this.nodes.set(
            'DomainLockNode',
            new DomainLockNode(this.options)
        );
    }
}
