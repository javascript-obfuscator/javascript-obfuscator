/* tslint:disable:no-invalid-this */

import { IInitializable } from '../interfaces/IInitializable';

const defaultDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true
};
const initializedTargetMetadataKey: string = '_initialized';
const initializablePropertiesSetMetadataKey: string = '_initializablePropertiesSet';
const constructorMethodName: string = 'constructor';

/**
 * @param {string} initializeMethodName
 * @returns {(target: IInitializable, propertyKey: (string | symbol)) => any}
 */
export function initializable (
    initializeMethodName: string = 'initialize'
): (target: IInitializable, propertyKey: string | symbol) => any {
    const decoratorName: string = Object.keys(this)[0];

    return (target: IInitializable, propertyKey: string | symbol): PropertyDescriptor => {
        const initializeMethod: Function = target[initializeMethodName];

        if (!initializeMethod || typeof initializeMethod !== 'function') {
            throw new Error(`\`${initializeMethodName}\` method with initialization logic not ` +
                `found. \`@${decoratorName}\` decorator requires \`${initializeMethodName}\` method`);
        }

        if (!target[initializablePropertiesSetMetadataKey]) {
            target[initializablePropertiesSetMetadataKey] = new Set();
        }

        wrapTargetMethodsInInitializedCheck(target, initializeMethodName);
        wrapInitializeMethodInInitializeCheck(target, initializeMethodName, propertyKey);

        return wrapInitializableProperty(target, propertyKey);
    };
}

/**
 * Wraps all target methods with additional logic that check that this methods will called after `initialize` method
 *
 * @param {IInitializable} target
 * @param {string} initializeMethodName
 */
function wrapTargetMethodsInInitializedCheck (target: IInitializable, initializeMethodName: string): void {
    const ownPropertyNames: string[] = Object.getOwnPropertyNames(target);
    const prohibitedPropertyNames: string[] = [initializeMethodName, constructorMethodName];

    target[initializedTargetMetadataKey] = false;

    ownPropertyNames.forEach((propertyName: string) => {
        const isProhibitedPropertyName: boolean = prohibitedPropertyNames.includes(propertyName)
            || target[initializablePropertiesSetMetadataKey].has(propertyName);

        if (isProhibitedPropertyName) {
            return;
        }

        const targetProperty: any = target[propertyName];

        if (typeof targetProperty !== 'function') {
            return;
        }

        const methodDescriptor: PropertyDescriptor = Object
            .getOwnPropertyDescriptor(target, propertyName) || defaultDescriptor;
        const originalMethod: Function = methodDescriptor.value;

        Object.defineProperty(target, propertyName, {
            ...methodDescriptor,
            value: function (): void {
                if (!this[initializedTargetMetadataKey]) {
                    throw new Error(`Class should be initialized with \`${initializeMethodName}()\` method`);
                }

                originalMethod.apply(this, arguments);
            }
        });
    });
}

/**
 * Wraps `initialize` method with additional logic to check that `initialized` properties will set
 *
 * @param {IInitializable} target
 * @param {string} initializeMethodName
 * @param {string | symbol} propertyKey
 */
function wrapInitializeMethodInInitializeCheck (
    target: IInitializable,
    initializeMethodName: string,
    propertyKey: string | symbol
): void {
    const methodDescriptor: PropertyDescriptor = Object
        .getOwnPropertyDescriptor(target, initializeMethodName) || defaultDescriptor;
    const originalMethod: Function = methodDescriptor.value;

    Object.defineProperty(target, initializeMethodName, {
        ...methodDescriptor,
        value: function (): void {
            originalMethod.apply(this, arguments);

            this[initializedTargetMetadataKey] = true;

            if (this[propertyKey]) {}
        }
    });
}

/**
 * Wraps initializable property in additional checks
 *
 * @param {IInitializable} target
 * @param {string | symbol} propertyKey
 * @returns {PropertyDescriptor}
 */
function wrapInitializableProperty (target: IInitializable, propertyKey: string | symbol): PropertyDescriptor {
    target[initializablePropertiesSetMetadataKey].add(propertyKey);

    const initializablePropertyMetadataKey: string = `_${propertyKey}`;
    const propertyDescriptor: PropertyDescriptor = Object
            .getOwnPropertyDescriptor(target, initializablePropertyMetadataKey) || defaultDescriptor;

    Object.defineProperty(target, propertyKey, {
        ...propertyDescriptor,
        get: function (): any {
            if (this[initializablePropertyMetadataKey] === undefined) {
                throw new Error(`Property \`${propertyKey}\` is not initialized! Initialize it first!`);
            }

            return this[initializablePropertyMetadataKey];
        },
        set: function (newVal: any): void {
            this[initializablePropertyMetadataKey] = newVal;
        }
    });

    return propertyDescriptor;
}
