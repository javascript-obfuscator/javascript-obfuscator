import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { DeadCodeInjectionCustomNode } from '../../../enums/custom-nodes/DeadCodeInjectionCustomNode';

export type TDeadNodeInjectionCustomNodeFactory = <
    TInitialData extends unknown[] = unknown[]
> (deadCodeInjectionCustomNodeName: DeadCodeInjectionCustomNode) => ICustomNode <TInitialData>;
