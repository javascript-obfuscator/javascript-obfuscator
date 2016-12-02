import { IInitializable } from '../interfaces/IInitializable';

/**
 * @param initializeMethodKey
 * @returns {(target:IInitializable, propertyKey:(string|symbol))=>PropertyDescriptor}
 */
export function initializable (
    initializeMethodKey: string = 'initialize'
): (target: IInitializable, propertyKey: string | symbol) => any {
    const decoratorName: string = Object.keys(this)[0];

    return (target: IInitializable, propertyKey: string | symbol): any => {
        const initializeMethod: any = (<any>target)[initializeMethodKey];

        if (!initializeMethod || typeof initializeMethod !== 'function') {
           throw new Error(`\`${initializeMethodKey}\` method with initialization logic not found. \`@${decoratorName}\` decorator requires \`${initializeMethodKey}\` method`);
        }

        const methodDescriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, initializeMethodKey) || {
            configurable: true,
            enumerable: true
        };
        const originalMethod: Function = methodDescriptor.value;

        methodDescriptor.value = function () {
            originalMethod.apply(this, arguments);

            // call property getter to activate initialization check inside it
            if (this[propertyKey]) {}
        };

        Object.defineProperty(target, initializeMethodKey, methodDescriptor);

        const metadataPropertyKey: string = `_${propertyKey}`;
        const propertyDescriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, metadataPropertyKey) || {
            configurable: true,
            enumerable: true
        };

        propertyDescriptor.get = function(): any {
            if (this[metadataPropertyKey] === undefined) {
                throw new Error(`Property \`${propertyKey}\` is not initialized! Initialize it first!`);
            }

            return this[metadataPropertyKey];
        };

        propertyDescriptor.set = function (newVal: any) {
            this[metadataPropertyKey] = newVal;
        };

        Object.defineProperty(target, propertyKey, propertyDescriptor);

        return propertyDescriptor;
    }
}
