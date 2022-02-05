import { TControlFlowStorageFactory } from './TControlFlowStorageFactory';

import { ControlFlowStorage } from '../../../enums/storages/ControlFlowStorage';

export type TControlFlowStorageFactoryCreator = (controlFlowStorageName: ControlFlowStorage) => TControlFlowStorageFactory;
