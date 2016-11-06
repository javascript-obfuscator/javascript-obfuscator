export interface IReplacer {
    replace (nodeValue: any, namesMap?: Map <string, string>): string;
}
