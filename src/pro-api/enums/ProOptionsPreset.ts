import { Utils } from '../../utils/Utils';

export const ProOptionsPreset: Readonly<{
    Default: 'default';
    LowObfuscation: 'low-obfuscation';
    MediumObfuscation: 'medium-obfuscation';
    HighObfuscation: 'high-obfuscation';
    VMLowObfuscation: 'vm-low-obfuscation';
    VMDefault: 'vm-default';
    VMMediumObfuscation: 'vm-medium-obfuscation';
    VMHighObfuscation: 'vm-high-obfuscation';
    VMUltraHighObfuscation: 'vm-ultra-high-obfuscation';
    VMAntiLLM: 'vm-anti-llm';
}> = Utils.makeEnum({
    Default: 'default',
    LowObfuscation: 'low-obfuscation',
    MediumObfuscation: 'medium-obfuscation',
    HighObfuscation: 'high-obfuscation',
    VMLowObfuscation: 'vm-low-obfuscation',
    VMDefault: 'vm-default',
    VMMediumObfuscation: 'vm-medium-obfuscation',
    VMHighObfuscation: 'vm-high-obfuscation',
    VMUltraHighObfuscation: 'vm-ultra-high-obfuscation',
    VMAntiLLM: 'vm-anti-llm'
});
