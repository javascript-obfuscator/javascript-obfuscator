import 'reflect-metadata';

import { assert } from 'chai';

import { initializable } from '../../../../src/decorators/Initializable';
import { IInitializable } from '../../../../src/interfaces/IInitializable';

describe('@initializable', () => {
    describe('initializable (initializeMethodKey: string): any', () => {
        describe('variant #1: property was initialized', () => {
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

        describe('variant #2: `initialize` method should be called first', () => {
            describe('variant #1: `initialize` method was called first', () => {
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

                it('should throws an error if `initialize` method wasn\'t called first', () => {
                    assert.doesNotThrow(testFunc, /Class should be initialized/);
                });
            });

            describe('variant #2: `initialize` method wasn\'t called first', () => {
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

            describe('variant #3: `initialize` method wasn\'t called', () => {
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

        describe('variant #3: property didn\'t initialized', () => {
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

        describe('variant #4: `initialize` method with custom name', () => {
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
});
