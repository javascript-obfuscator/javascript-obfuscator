import * as ESTree from 'estree';

export interface IObfuscator {
    obfuscateNode (node: ESTree.Node): ESTree.Node;
}
