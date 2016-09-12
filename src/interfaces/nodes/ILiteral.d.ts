import * as ESTree from 'estree';

interface ILiteral extends ESTree.SimpleLiteral {
    'x-verbatim-property'?: any;
}
