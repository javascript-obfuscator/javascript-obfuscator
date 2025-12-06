import { IProObfuscationResult } from '../interfaces/pro-api/IProApiClient';

export type TProObfuscationResultsObject<TSourceCodesObject> = { [key in keyof TSourceCodesObject]: IProObfuscationResult };
