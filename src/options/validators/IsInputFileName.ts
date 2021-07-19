import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

import { TInputOptions } from '../../types/options/TInputOptions';

import { SourceMapSourcesMode } from '../../enums/source-map/SourceMapSourcesMode';

/**
 * @returns {PropertyDecorator}
 */
export const IsInputFileName = (): PropertyDecorator => {
    return (target: any, key: string | symbol): void => {
        IsString()(target, key);
        ValidateIf(({sourceMapSourcesMode}: TInputOptions) => {
            return sourceMapSourcesMode === SourceMapSourcesMode.Sources;
        })(target, key);
        IsNotEmpty()(target, key);
    };
};
