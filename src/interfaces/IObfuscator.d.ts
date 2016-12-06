import * as ESTree from 'estree';

export interface IObfuscator {
    obfuscateAstTree (astTree: ESTree.Program): ESTree.Program;
}
