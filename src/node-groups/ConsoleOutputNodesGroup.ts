import { IOptions } from '../interfaces/IOptions';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { ConsoleOutputDisableExpressionNode } from '../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode';

export class ConsoleOutputNodesGroup extends AbstractNodesGroup {
    /**
     * @param options
     */
    constructor (options: IOptions) {
        super(options);

        if (!this.options.disableConsoleOutput) {
            return;
        }

        this.nodes.set(
            'consoleOutputDisableExpressionNode',
            new ConsoleOutputDisableExpressionNode(this.options)
        );
    }
}
