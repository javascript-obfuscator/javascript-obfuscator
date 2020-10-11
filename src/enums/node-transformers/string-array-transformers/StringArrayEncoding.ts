import { MakeEnum } from '../../../utils/TsEnum';

export const StringArrayEncoding: Readonly<{
    None: 'none';
    Base64: 'base64';
    Rc4: 'rc4';
}> = MakeEnum({
    None: 'none',
    Base64: 'base64',
    Rc4: 'rc4'
});
