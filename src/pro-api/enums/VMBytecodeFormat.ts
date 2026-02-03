import { Utils } from '../../utils/Utils';

export const VMBytecodeFormat: Readonly<{
    Json: 'json';
    Binary: 'binary';
}> = Utils.makeEnum({
    Json: 'json',
    Binary: 'binary'
});
