import { IOptions } from "../interfaces/IOptions";

import { ConsoleOutputDisableExpressionNode } from "../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode";
import { NodesGroup } from './NodesGroup';

export class ConsoleOutputNodesGroup extends NodesGroup {
    /**
     * @param options
     */
    constructor (options: IOptions) {
        super(options);

        if (!this.options.get('disableConsoleOutput')) {
            return;
        }

        this.nodes.set(
            'consoleOutputDisableExpressionNode',
            new ConsoleOutputDisableExpressionNode(this.options)
        );
    }
}
