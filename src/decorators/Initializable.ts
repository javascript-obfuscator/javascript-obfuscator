/* tslint:disable:no-invalid-this */

import { IInitializable } from '../interfaces/IInitializable';

const defaultDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true
};
const initializedTargetMetadataKey: string = '_initialized';
const initializablePropertiesSetMetadataKey: string = '_initializablePropertiesSet';
const wrappedMethodsSetMetadataKey: string = '_wrappedMethodsSet';
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

        /**
         * Stage #1: initialize target metadata
         */
        initializeTargetMetadata(initializedTargetMetadataKey, false, target);
        initializeTargetMetadata(initializablePropertiesSetMetadataKey, new Set(), target);
        initializeTargetMetadata(wrappedMethodsSetMetadataKey, new Set(), target);

        /**
         * Stage #2: wrap target methods
         */
        wrapTargetMethodsInInitializedCheck(target, initializeMethodName);
        wrapInitializeMethodInInitializeCheck(target, initializeMethodName, propertyKey);

        /**
         * Stage #3: wrap target properties
         */
        return wrapInitializableProperty(target, propertyKey);
    };
}

/**
 * @param {string} metadataKey
 * @param metadataValue
 * @param {IInitializable} target
 */
function initializeTargetMetadata (metadataKey: string, metadataValue: any, target: IInitializable): void {
    const hasInitializedMetadata: boolean = Reflect.hasMetadata(metadataKey, target);

    if (!hasInitializedMetadata) {
        Reflect.defineMetadata(metadataKey, metadataValue, target);
    }
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

    ownPropertyNames.forEach((propertyName: string) => {
        const initializablePropertiesSet: Set <string | symbol> = Reflect
            .getMetadata(initializablePropertiesSetMetadataKey, target);
        const wrappedMethodsSet: Set <string | symbol> = Reflect
            .getMetadata(wrappedMethodsSetMetadataKey, target);

        const isProhibitedPropertyName: boolean = prohibitedPropertyNames.includes(propertyName)
            || initializablePropertiesSet.has(propertyName)
            || wrappedMethodsSet.has(propertyName);

        if (isProhibitedPropertyName) {
            return;
        }

        const targetProperty: IInitializable[keyof IInitializable] = target[propertyName];

        if (typeof targetProperty !== 'function') {
            return;
        }

        const methodDescriptor: PropertyDescriptor = Object
            .getOwnPropertyDescriptor(target, propertyName) || defaultDescriptor;
        const originalMethod: Function = methodDescriptor.value;

        Object.defineProperty(target, propertyName, {
            ...methodDescriptor,
            value: function (): void {
                if (!Reflect.getMetadata(initializedTargetMetadataKey, this)) {
                    throw new Error(`Class should be initialized with \`${initializeMethodName}()\` method`);
                }

                return originalMethod.apply(this, arguments);
            }
        });

        wrappedMethodsSet.add(propertyName);
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
        value: function (): typeof originalMethod {
            /**
             * should define metadata before `initialize` method call,
             * because of cases when other methods will called inside `initialize` method
             */
            Reflect.defineMetadata(initializedTargetMetadataKey, true, this);

            const result: typeof originalMethod = originalMethod.apply(this, arguments);

            if (this[propertyKey]) {}

            return result;
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
    const initializablePropertiesSet: Set <string | symbol> = Reflect
        .getMetadata(initializablePropertiesSetMetadataKey, target);

    initializablePropertiesSet.add(propertyKey);

    const initializablePropertyMetadataKey: string = `_${propertyKey.toString()}`;
    const propertyDescriptor: PropertyDescriptor = Object
            .getOwnPropertyDescriptor(target, initializablePropertyMetadataKey) || defaultDescriptor;

    Object.defineProperty(target, propertyKey, {
        ...propertyDescriptor,
        get: function (): any {
            if (this[initializablePropertyMetadataKey] === undefined) {
                throw new Error(`Property \`${propertyKey.toString()}\` is not initialized! Initialize it first!`);
            }

            return this[initializablePropertyMetadataKey];
        },
        set: function (newVal: any): void {
            this[initializablePropertyMetadataKey] = newVal;
        }
    });

    return propertyDescriptor;
}
