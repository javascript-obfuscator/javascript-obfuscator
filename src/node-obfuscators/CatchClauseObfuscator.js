"use strict";
const NodeObfuscator_1 = require('./NodeObfuscator');
const Utils_1 = require('../Utils');
let estraverse = require('estraverse');
class CatchClauseObfuscator extends NodeObfuscator_1.NodeObfuscator {
    constructor(...args) {
        super(...args);
        this.catchClauseParam = new Map();
    }
    obfuscateNode(catchClauseNode) {
        this.replaceCatchClauseParam(catchClauseNode);
        this.replaceCatchClauseParamInBlock(catchClauseNode);
    }
    replaceCatchClauseParam(catchClauseNode) {
        estraverse.replace(catchClauseNode.param, {
            leave: (node, parentNode) => {
                if (node.type !== 'Identifier') {
                    return;
                }
                this.catchClauseParam.set(node.name, Utils_1.Utils.getRandomVariableName());
                node.name = this.catchClauseParam.get(node.name);
            }
        });
    }
    replaceCatchClauseParamInBlock(catchClauseNode) {
        estraverse.replace(catchClauseNode.body, {
            leave: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.catchClauseParam);
            }
        });
    }
}
exports.CatchClauseObfuscator = CatchClauseObfuscator;
