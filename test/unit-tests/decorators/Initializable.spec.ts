import { initializable } from '../../../src/decorators/Initializable';
import { IInitializable } from '../../../src/interfaces/IInitializable';

const assert: Chai.AssertStatic = require('chai').assert;

describe('@initializable', () => {
    describe('initializable (initializeMethodKey: string): any', () => {
        it('shouldn\'t throws an errors if property was initialized', () => {
            assert.doesNotThrow(() => {
                class Foo implements IInitializable {
                    @initializable()
                    public property: string;

                    public initialize (property: string): void {
                        this.property = property;
                    }
                }

                const foo: Foo = new Foo();

                foo.initialize('baz');

                foo.property;
            }, Error);
        });

        it('shouldn\'t throws an errors if custom initialization method name is passed', () => {
            assert.doesNotThrow(() => {
                class Foo implements IInitializable {
                    @initializable()
                    public property: string;

                    public initialize (): void {
                    }

                    public bar (property: string): void {
                        this.property = property;
                    }
                }

                const foo: Foo = new Foo();

                foo.bar('baz');

                foo.property;
            }, Error);
        });

        it('should throws an error if property didn\'t initialized', () => {
            assert.throws(() => {
                class Foo implements IInitializable {
                    @initializable()
                    public property: string;

                    public initialize (property: string): void {
                    }
                }

                const foo: Foo = new Foo();

                foo.initialize('baz');

                foo.property;
            }, /Property `property` is not initialized/);
        });

        it('should throws an error if `initialize` method with custom name wasn\'t found', () => {
            assert.throws(() => {
                class Foo {
                    @initializable('bar')
                    public property: string;

                    public initialize (property: string): void {
                        this.property = property;
                    }
                }

                const foo: Foo = new Foo();

                foo.initialize('baz');

                foo.property;
            }, /method with initialization logic not found/);
        });
    });
});
