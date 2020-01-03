import { MakeEnum } from '@gradecam/tsenum';

export const SourceMapMode: Readonly<{
    Separate: string;
    Inline: string;
}> = MakeEnum({
    Inline: 'inline',
    Separate: 'separate'
});
