import { Utils } from '../../../utils/Utils';

export const StringArrayWrappersType: Readonly<{
    Variable: 'variable';
    Function: 'function';
}> = Utils.makeEnum({
    Variable: 'variable',
    Function: 'function',
});
