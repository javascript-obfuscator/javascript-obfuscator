export interface INode {
    type: string;
    parentNode?: INode;
    obfuscated?: boolean;
}
