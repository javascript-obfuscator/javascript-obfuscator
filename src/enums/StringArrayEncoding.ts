import { MakeEnum } from '@gradecam/tsenum';

export const StringArrayEncoding: Readonly<{
    Rc4: string;
    Base64: string;
}> = MakeEnum({
    Base64: 'base64',
    Rc4: 'rc4'
});
