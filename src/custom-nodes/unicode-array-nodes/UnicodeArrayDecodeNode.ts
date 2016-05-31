import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

import { AppendState } from "../../enums/AppendState";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

export class UnicodeArrayDecodeNode extends Node {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string[]}
     */
    private unicodeArray: string[];

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @param unicodeArrayName
     * @param unicodeArray
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: string[]
    ) {
        super();

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TBlockScopeNode): void {
        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        if (!this.unicodeArray.length) {
            return;
        }

        return super.getNode();
    }

    /**
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        let decodedTempArrayName: string = Utils.getRandomVariableName(),
            indexVariableName: string = Utils.getRandomVariableName(),
            node: INode = esprima.parse(`
                (function () {
                    !function(){function t(t){this.message=t}var r=[]["filter"]["constructor"]("return this")(),e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype=new Error,t.prototype.name="InvalidCharacterError",r.atob||(r.atob=function(r){var o=String(r).replace(/=+$/,"");if(o.length%4==1)throw new t("Have a nice day!");for(var n,a,i=0,c=0,d="";a=o.charAt(c++);~a&&(n=i%4?64*n+a:a,i++%4)?d+=String.fromCharCode(255&n>>(-2*i&6)):0)a=e.indexOf(a);return d})}(); 
                    
                    var ${decodedTempArrayName} = [];
                    
                    for (var ${indexVariableName} in ${this.unicodeArrayName}) {
                        ${decodedTempArrayName}[${Utils.stringToUnicode('push')}](atob(${this.unicodeArrayName}[${indexVariableName}]));
                    }
                    
                    ${this.unicodeArrayName} = ${decodedTempArrayName};
                })();
            `);

        NodeUtils.addXVerbatimPropertyToLiterals(node);

        return NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
