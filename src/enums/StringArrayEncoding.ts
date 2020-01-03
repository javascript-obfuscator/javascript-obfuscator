import { MakeEnum } from '@gradecam/tsenum';

export const StringArrayEncoding: Readonly<{
    Base64: 'base64';
    Rc4: 'rc4';
}> = MakeEnum({
    Base64: 'base64',
    Rc4: 'rc4'
});
