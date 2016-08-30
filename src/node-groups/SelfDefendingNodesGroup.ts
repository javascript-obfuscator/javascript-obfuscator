import { IOptions } from "../interfaces/IOptions";

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { SelfDefendingUnicodeNode } from "../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode";

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
