import { INodeGuard } from '../../../interfaces/node-guards/INodeGuard';

import { NodeGuard } from '../../../enums/container/node-guards/NodeGuard';

export type TNodeGuardFactory = (nodeGuard: NodeGuard) => INodeGuard;
