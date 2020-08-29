import { MakeEnum } from '@gradecam/tsenum';

export const OptionsPreset: Readonly<{
    Default: 'default';
    LowObfuscation: 'low-obfuscation';
    MediumObfuscation: 'medium-obfuscation';
    HighObfuscation: 'high-obfuscation';
}> = MakeEnum({
    Default: 'default',
    LowObfuscation: 'low-obfuscation',
    MediumObfuscation: 'medium-obfuscation',
    HighObfuscation: 'high-obfuscation'
});
