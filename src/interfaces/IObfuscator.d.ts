import * as ESTree from 'estree';

export interface IObfuscator {
    obfuscateAstTree (node: ESTree.Program): ESTree.Program;
}
