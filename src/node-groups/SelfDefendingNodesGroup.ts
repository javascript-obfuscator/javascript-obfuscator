import { IOptions } from "../interfaces/IOptions";

import { NodesGroup } from './NodesGroup';
import { SelfDefendingUnicodeNode } from "../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode";

export class SelfDefendingNodesGroup extends NodesGroup {
    /**
     * @param options
     */
    constructor (options: IOptions) {
        super(options);

        if (!this.options.get('selfDefending')) {
            return;
        }

        this.nodes.set(
            'selfDefendingUnicodeNode',
            new SelfDefendingUnicodeNode(this.options)
        );
    }
}
