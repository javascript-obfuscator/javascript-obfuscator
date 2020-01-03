import { MakeEnum } from '@gradecam/tsenum';

export const SourceMapMode: Readonly<{
    Inline: 'inline';
    Separate: 'separate';
}> = MakeEnum({
    Inline: 'inline',
    Separate: 'separate'
});
