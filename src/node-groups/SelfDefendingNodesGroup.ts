import { IOptions } from 'app/interfaces/IOptions';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { SelfDefendingUnicodeNode } from 'app/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode';

export class SelfDefendingNodesGroup extends AbstractNodesGroup {
    /**
     * @param options
     */
    constructor (options: IOptions) {
        super(options);

        if (!this.options.selfDefending) {
            return;
        }

        this.nodes.set(
            'selfDefendingUnicodeNode',
            new SelfDefendingUnicodeNode(this.options)
        );
    }
}
