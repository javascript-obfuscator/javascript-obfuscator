import { Utils } from '../../../utils/Utils';

export const OptionsPreset: Readonly<{
    Default: 'default';
    LowObfuscation: 'low-obfuscation';
    MediumObfuscation: 'medium-obfuscation';
    HighObfuscation: 'high-obfuscation';
}> = Utils.makeEnum({
    Default: 'default',
    LowObfuscation: 'low-obfuscation',
    MediumObfuscation: 'medium-obfuscation',
    HighObfuscation: 'high-obfuscation'
});
