import { assert } from 'chai';

import { ValidationError } from 'class-validator';

import { ValidationErrorsFormatter } from '../../../src/options/ValidationErrorsFormatter';

describe('ValidationErrorsFormatter', () => {
    describe('format', () => {
        describe('Variant #1: one constraint group with one constraint', () => {
            const constraintGroupRegExp: RegExp = /`foo` *errors:/;
            const constraintRegExp: RegExp = /(?: *-)+ *constraint *text/;
            const validationErrors: ValidationError[] = [{
                target: {},
                property: 'foo',
                value: null,
                constraints: {
                    'constraint1': '- constraint text'
                },
                children: []
            }];

            let validationError: string;

            before(() => {
                validationError = ValidationErrorsFormatter.format(validationErrors);
            });

            it('match #1: should return valid validation errors', () => {
                assert.match(validationError, constraintGroupRegExp);
            });

            it('match #2: should return valid validation errors', () => {
                assert.match(validationError, constraintRegExp);
            });
        });

        describe('Variant #2: one constraint group with two constraint', () => {
            const constraintGroupRegExp: RegExp = /`foo` *errors:/;
            const constraintRegExp1: RegExp = /(?: *-)+ constraint *text *#1/;
            const constraintRegExp2: RegExp = /(?: *-)+ constraint *text *#2/;
            const validationErrors: ValidationError[] = [{
                target: {},
                property: 'foo',
                value: null,
                constraints: {
                    'constraint1': '- constraint text #1',
                    'constraint2': '- constraint text #2'
                },
                children: []
            }];

            let validationError: string;

            before(() => {
                validationError = ValidationErrorsFormatter.format(validationErrors);
            });

            it('match #1: should return valid validation errors', () => {
                assert.match(validationError, constraintGroupRegExp);
            });

            it('match #2: should return valid validation errors', () => {
                assert.match(validationError, constraintRegExp1);
            });

            it('match #3: should return valid validation errors', () => {
                assert.match(validationError, constraintRegExp2);
            });
        });

        describe('Variant #3: two constraint groups', () => {
            const regExpMatch: string = `` +
                `\`foo\` *errors:\\n` +
                    `(?: *-)+ *constraint *group *#1 *text\\n+` +
                `\`bar\` *errors:\\n` +
                    `(?: *-)+ *constraint *group *#2 *text\\n+` +
            ``;
            const regExp: RegExp = new RegExp(regExpMatch);
            const validationErrors: ValidationError[] = [{
                target: {},
                property: 'foo',
                value: null,
                constraints: {
                    'constraint': '- constraint group #1 text'
                },
                children: []
            }, {
                target: {},
                property: 'bar',
                value: null,
                constraints: {
                    'constraint': '- constraint group #2 text'
                },
                children: []
            }];

            let validationError: string;

            before(() => {
                validationError = ValidationErrorsFormatter.format(validationErrors);
            });

            it('should return valid validation errors', () => {
                assert.match(validationError, regExp);
            });
        });
    });
});
