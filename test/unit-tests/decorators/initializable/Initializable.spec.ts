import 'reflect-metadata';

import { assert } from 'chai';

import { initializable } from '../../../../src/decorators/Initializable';
import { IInitializable } from '../../../../src/interfaces/IInitializable';

describe('@initializable', () => {
    describe('Variant #1: property was initialized', () => {
        const testFunc: () => void = () => {
            class Foo implements IInitializable {
                @initializable()
                public property!: string;

                public initialize (property: string): void {
                    this.property = property;
                }
            }

            const foo: Foo = new Foo();

            foo.initialize('baz');

            foo.property;
        };

        it('shouldn\'t throws an errors if property was initialized', () => {
            assert.doesNotThrow(testFunc, Error);
        });
    });

    describe('Variant #2: `initialize` method should be called first', () => {
        describe('Variant #1: `initialize` method was called first', () => {
            const testFunc: () => void = () => {
                class Foo {
                    @initializable()
                    public property!: string;

                    public initialize (property: string): void {
                        this.property = property;
                    }

                    public bar (): void {}
                }

                const foo: Foo = new Foo();

                foo.initialize('baz');
                foo.bar();
            };

            it('shouldn\'t throw an error if `initialize` method was called first', () => {
                assert.doesNotThrow(testFunc, /Class should be initialized/);
            });
        });

        describe('Variant #2: other method was called inside `initialize` method with initialization of the property', () => {
            const testFunc: () => void = () => {
                class Foo {
                    @initializable()
                    public property!: string;

                    public initialize (property: string): void {
                        this.innerInitialize(property);
                    }

                    public innerInitialize (property: string): void {
                        this.property = property;
                    }
                }

                const foo: Foo = new Foo();

                foo.initialize('baz');
            };

            it('shouldn\'t throw an error if other method was called inside `initialize` method', () => {
                assert.doesNotThrow(testFunc, /Class should be initialized/);
            });
        });

        describe('Variant #3: other method was called inside `initialize` method without initialization of the property', () => {
            const testFunc: () => void = () => {
                class Foo {
                    @initializable()
                    public property!: string;

                    public initialize (property: string): void {
                        this.innerInitialize(property);
                    }

                    public innerInitialize (property: string): void {
                    }
                }

                const foo: Foo = new Foo();

                foo.initialize('baz');
            };

            it('should throws an error if other method was called inside `initialize` method without initialization of the property', () => {
                assert.throws(testFunc, /Property `property` is not initialized/);
            });
        });

        describe('Variant #4: `initialize` method wasn\'t called first', () => {
            const testFunc: () => void = () => {
                class Foo {
                    @initializable()
                    public property!: string;

                    public initialize (property: string): void {
                        this.property = property;
                    }

                    public bar (): void {}
                }

                const foo: Foo = new Foo();

                foo.bar();
                foo.initialize('baz');
            };

            it('should throws an error if `initialize` method wasn\'t called first', () => {
                assert.throws(testFunc, /Class should be initialized/);
            });
        });

        describe('Variant #5: `initialize` method wasn\'t called', () => {
            const testFunc: () => void = () => {
                class Foo {
                    @initializable()
                    public property!: string;

                    public initialize (property: string): void {
                        this.property = property;
                    }

                    public bar (): void {}
                }

                const foo: Foo = new Foo();

                foo.bar();
            };

            it('should throws an error if `initialize` method wasn\'t called first', () => {
                assert.throws(testFunc, /Class should be initialized/);
            });
        });
    });

    describe('Variant #3: property didn\'t initialized', () => {
        const testFunc: () => void = () => {
            class Foo implements IInitializable {
                @initializable()
                public property!: string;

                public initialize (property: string): void {
                }
            }

            const foo: Foo = new Foo();

            foo.initialize('baz');

            foo.property;
        };

        it('should throws an error if property didn\'t initialized', () => {
            assert.throws(testFunc, /Property `property` is not initialized/);
        });
    });

    describe('Variant #4: `initialize` method with custom name', () => {
        const testFunc: () => void = () => {
            class Foo {
                @initializable('bar')
                public property!: string;

                public initialize (property: string): void {
                    this.property = property;
                }
            }

            const foo: Foo = new Foo();

            foo.initialize('baz');

            foo.property;
        };

        it('should throws an error if `initialize` method with custom name wasn\'t found', () => {
            assert.throws(testFunc, /method with initialization logic not found/);
        });
    });
});
