declare module "esmangle" {
    import * as ESTree from 'estree';

    function mangle (ast: ESTree.Program): ESTree.Program;
}
