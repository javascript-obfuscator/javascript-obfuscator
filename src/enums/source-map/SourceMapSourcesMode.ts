import { Utils } from '../../utils/Utils';

export const SourceMapSourcesMode: Readonly<{
    Sources: 'sources';
    SourcesContent: 'sources-content';
}> = Utils.makeEnum({
    Sources: 'sources',
    SourcesContent: 'sources-content'
});
