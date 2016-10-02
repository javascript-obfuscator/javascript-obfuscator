import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from 'app/types/TNodeWithBlockStatement';

import { AppendState } from 'app/enums/AppendState';

import { ConsoleOutputDisableExpressionTemplate } from 'app/templates/custom-nodes/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate';

import { AbstractCustomNode } from 'app/custom-nodes/AbstractCustomNode';
import { NodeUtils } from 'app/NodeUtils';

export class ConsoleOutputDisableExpressionNode extends AbstractCustomNode {
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
     *  (function () {
     *      var _console = []["filter"]["constructor"]("return this")().console;
     *      var _function = function () {};
     *
     *      _console.log = _function;
     *      _console.info = _function;
     *      _console.warn = _function;
     *      _console.error = _function;
     *  _console
     *  })();
     *
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        return NodeUtils.convertCodeToStructure(
            ConsoleOutputDisableExpressionTemplate()
        );
    }
}
