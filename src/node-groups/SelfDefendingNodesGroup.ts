import { IOptions } from "../interfaces/IOptions";

import { DebugProtectionFunctionCallNode } from "../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode";
import { DebugProtectionFunctionIntervalNode } from "../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode";
import { DebugProtectionFunctionNode } from "../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode";

import { NodesGroup } from './NodesGroup';
import { Utils } from '../Utils';
import {SelfDefendingUnicodeNode} from "../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode";

export class SelfDefendingNodesGroup extends NodesGroup {
    /**
     * @param options
     */
    constructor (options: IOptions = {}) {
        super(options);

        this.nodes.set(
            'selfDefendingUnicodeNode',
            new SelfDefendingUnicodeNode(this.options)
        );
    }
}
