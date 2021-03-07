import { Utils } from '../../../utils/Utils';

export const RenamePropertiesMode: Readonly<{
    Safe: 'safe';
    Unsafe: 'unsafe';
}> = Utils.makeEnum({
    Safe: 'safe',
    Unsafe: 'unsafe'
});
