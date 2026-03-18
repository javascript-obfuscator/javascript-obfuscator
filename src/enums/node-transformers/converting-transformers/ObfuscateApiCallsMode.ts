import { Utils } from '../../../utils/Utils';

export const ObfuscateApiCallsMode: Readonly<{
    CallsOnly: 'calls-only';
    AllAccess: 'all-access';
}> = Utils.makeEnum({
    CallsOnly: 'calls-only',
    AllAccess: 'all-access'
});
