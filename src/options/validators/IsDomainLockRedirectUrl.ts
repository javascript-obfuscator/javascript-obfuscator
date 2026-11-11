import { ValidateBy, ValidateIf, buildMessage, isURL } from 'class-validator';

import { TInputOptions } from '../../types/options/TInputOptions';

import { IOptions } from '../../interfaces/options/IOptions';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

import { DEFAULT_PRESET } from '../presets/Default';

import { IsAllowedForObfuscationTargets } from './IsAllowedForObfuscationTargets';

/**
 * @returns {PropertyDecorator}
 */
export const IsDomainLockRedirectUrl = (): PropertyDecorator => {
    return (target: any, key: string | symbol): void => {
        ValidateIf(({ domainLockRedirectUrl }: TInputOptions) => {
            return domainLockRedirectUrl !== DEFAULT_PRESET.domainLockRedirectUrl;
        })(target, key);
        // an empty string is checked here instead of `ValidateIf`,
        // so it's still validated with `IsAllowedForObfuscationTargets`
        ValidateBy({
            name: 'isDomainLockRedirectUrl',
            validator: {
                validate: (value: unknown): boolean =>
                    value === '' ||
                    isURL(<string>value, {
                        require_protocol: false,
                        require_host: false
                    }),
                defaultMessage: buildMessage(
                    (eachPrefix: string) => `${eachPrefix}$property must be a URL address or an empty string`
                )
            }
        })(target, key);
        IsAllowedForObfuscationTargets([ObfuscationTarget.Browser, ObfuscationTarget.BrowserNoEval])(
            target,
            <keyof IOptions>key
        );
    };
};
