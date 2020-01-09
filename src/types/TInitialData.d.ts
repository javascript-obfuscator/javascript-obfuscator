import { IInitializable } from '../interfaces/IInitializable';

export type TInitialData <TClass extends IInitializable> = Parameters<TClass['initialize']>;
