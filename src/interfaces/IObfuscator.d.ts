import * as ESTree from 'estree';

import { ICustomNode } from './custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from './IObfuscationEventEmitter';
import { IStorage } from './IStorage';

export interface IObfuscator {
    obfuscateAstTree (
        astTree: ESTree.Program,
        obfuscationEventEmitter: IObfuscationEventEmitter,
        customNodesStorage: IStorage<ICustomNode>
    ): ESTree.Program;
}
