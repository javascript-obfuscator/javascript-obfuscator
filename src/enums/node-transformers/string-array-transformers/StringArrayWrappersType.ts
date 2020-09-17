import { MakeEnum } from '@gradecam/tsenum';

export const StringArrayWrappersType: Readonly<{
    Variable: 'variable';
    Function: 'function';
}> = MakeEnum({
    Variable: 'variable',
    Function: 'function',
});
