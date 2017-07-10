/* tslint:disable:no-invalid-this */

import { IInitializable } from '../interfaces/IInitializable';

/**
 * @param {string} initializeMethodKey
 * @returns {any}
 */
export function initializable (
    initializeMethodKey: string = 'initialize'
): (target: IInitializable, propertyKey: string | symbol) => any {
    const decoratorName: string = Object.keys(this)[0];

    return (target: IInitializable, propertyKey: string | symbol): PropertyDescriptor => {
        const descriptor: PropertyDescriptor = {
            configurable: true,
            enumerable: true
        };
        const initializeMethod: Function = target[initializeMethodKey];

        if (!initializeMethod || typeof initializeMethod !== 'function') {
            throw new Error(`\`${initializeMethodKey}\` method with initialization logic not found. \`@${decoratorName}\` decorator requires \`${initializeMethodKey}\` method`);
        }

        const metadataPropertyKey: string = `_${propertyKey}`;
        const propertyDescriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, metadataPropertyKey) || descriptor;
        const methodDescriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, initializeMethodKey) || descriptor;
        const originalMethod: Function = methodDescriptor.value;

        Object.defineProperty(target, propertyKey, {
            ...propertyDescriptor,
            get: function (): any {
                if (this[metadataPropertyKey] === undefined) {
                    throw new Error(`Property \`${propertyKey}\` is not initialized! Initialize it first!`);
                }

                return this[metadataPropertyKey];
            },
            set: function (newVal: any): void {
                this[metadataPropertyKey] = newVal;
            }
        });
        Object.defineProperty(target, initializeMethodKey, {
            ...methodDescriptor,
            value: function (): void {
                originalMethod.apply(this, arguments);

                if (this[propertyKey]) {}
            }
        });

        return propertyDescriptor;
    };
}
