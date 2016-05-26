"use strict";
const estraverse = require('estraverse');
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
const Utils_1 = require('../Utils');
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
                if (NodeUtils_1.NodeUtils.isIdentifierNode(node)) {
                    this.catchClauseParam.set(node.name, Utils_1.Utils.getRandomVariableName());
                    node.name = this.catchClauseParam.get(node.name);
                    return;
                }
                return estraverse.VisitorOption.Skip;
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
