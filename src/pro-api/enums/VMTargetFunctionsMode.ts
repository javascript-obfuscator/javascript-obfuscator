import { Utils } from '../../utils/Utils';

export const VMTargetFunctionsMode: Readonly<{
    Root: 'root';
    Comment: 'comment';
}> = Utils.makeEnum({
    Root: 'root',
    Comment: 'comment'
});
