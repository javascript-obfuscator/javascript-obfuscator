import { Utils } from '../../utils/Utils';

export const SourceMapMode: Readonly<{
    Inline: 'inline';
    Separate: 'separate';
}> = Utils.makeEnum({
    Inline: 'inline',
    Separate: 'separate'
});
