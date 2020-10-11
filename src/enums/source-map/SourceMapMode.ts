import { MakeEnum } from '../../utils/TsEnum';

export const SourceMapMode: Readonly<{
    Inline: 'inline';
    Separate: 'separate';
}> = MakeEnum({
    Inline: 'inline',
    Separate: 'separate'
});
