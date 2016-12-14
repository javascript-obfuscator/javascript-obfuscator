import { assert } from 'chai';

import { Utils } from '../../../src/utils/Utils';

import { JSFuck } from '../../../src/enums/JSFuck';

describe('Utils', () => {
    describe('arrayRotate <T> (array: T[], times: number): T[]', () => {
        let array: number[];

        beforeEach(() => {
            array = [1, 2, 3, 4, 5, 6];
        });

        it('should rotate (shift) array by a given value', () => {
            assert.deepEqual(Utils.arrayRotate(array, 2), [5, 6, 1, 2, 3, 4]);
        });


        it('should do nothing if value <= 0', () => {
            assert.deepEqual(Utils.arrayRotate(array, 0), [1, 2, 3, 4, 5, 6]);
            assert.deepEqual(Utils.arrayRotate(array, -1), [1, 2, 3, 4, 5, 6]);
        });

        it('should throw exception if array is empty', () => {
            assert.throws(() => Utils.arrayRotate([], 5), ReferenceError);
        });
    });

    describe('decToHex (dec: number): string', () => {
        it('should creates a string with hexadecimal value from a given decimal number', () => {
            assert.equal(Utils.decToHex(0), '0');
            assert.equal(Utils.decToHex(10), 'a');
            assert.equal(Utils.decToHex(17), '11');
            assert.equal(Utils.decToHex(536870912), '20000000');
        });
    });

    describe('extractDomainFromUrl (url: string): string', () => {
        it('should extract domain from the given URL', () => {
            assert.equal(Utils.extractDomainFromUrl('http://google.ru'), 'google.ru');
            assert.equal(Utils.extractDomainFromUrl('http://www.google.ru'), 'www.google.ru');
            assert.equal(Utils.extractDomainFromUrl('https://www.google.ru:9000'), 'www.google.ru');
            assert.equal(Utils.extractDomainFromUrl('//google.ru/abc'), 'google.ru');
            assert.equal(Utils.extractDomainFromUrl('//localhost:9000'), 'localhost');
        });
    });

    describe('isCeilNumber (number: number): boolean', () => {
        it('should return true if given number is a ceil', () => {
            assert.equal(Utils.isCeilNumber(4), true);
            assert.equal(Utils.isCeilNumber(4.5), false);
        });
    });

    describe('mapGetFirstKeyOf(map: Map <any, any>, value: any): any', () => {
        it('should returns key of map item', () => {
            const map: Map <any, any> = new Map();

            map.set('number1', 1);
            map.set('number2', 2);
            map.set('number3', 2);

            map.set('string1', 'foo');
            map.set('string2', 'bar');

            map.set('object1', {item: 'value'});
            map.set('object2', {item: 'value'});
            map.set({key: 'object'}, [1, 2, 3]);

            assert.deepEqual(Utils.mapGetFirstKeyOf(map, 1), 'number1');
            assert.deepEqual(Utils.mapGetFirstKeyOf(map, 2), 'number2');

            assert.deepEqual(Utils.mapGetFirstKeyOf(map, 'foo'), 'string1');
            assert.deepEqual(Utils.mapGetFirstKeyOf(map, 'bar'), 'string2');

            assert.deepEqual(Utils.mapGetFirstKeyOf(map, {item: 'value'}), 'object1');
            assert.deepEqual(Utils.mapGetFirstKeyOf(map, [1, 2, 3]), {key: 'object'});

            assert.deepEqual(Utils.mapGetFirstKeyOf(map, 3), null);
        });
    });

    describe('stringToJSFuck (string: string): string', () => {
        let expected: string = `${JSFuck.s} + ${JSFuck.t} + ${JSFuck.r} + ${JSFuck.i} + ${JSFuck.n} + ${JSFuck.g}`;

        it('should creates a JSFuck encoded string from a given string', () => {
            assert.equal(Utils.stringToJSFuck('string'), expected);
        });
    });

    describe('stringToUnicodeEscapeSequence (string: string): string', () => {
        let expected: string = '\\x73\\x74\\x72\\x69\\x6e\\x67';

        it('should return a unicode escape sequence based on a given string', () => {
            assert.equal(Utils.stringToUnicodeEscapeSequence('string'), expected);
        });
    });
});
