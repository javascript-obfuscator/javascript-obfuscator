import { Utils } from '../../../utils/Utils';

export const StringArrayEncoding: Readonly<{
    None: 'none';
    Base64: 'base64';
    Rc4: 'rc4';
}> = Utils.makeEnum({
    None: 'none',
    Base64: 'base64',
    Rc4: 'rc4'
});
