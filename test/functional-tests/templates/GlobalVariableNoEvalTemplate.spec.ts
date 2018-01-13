import 'reflect-metadata';

import * as format from 'string-template';

import { assert } from 'chai';

import { GlobalVariableNoEvalTemplate } from '../../../src/templates/GlobalVariableNoEvalTemplate';

describe('GlobalVariableNoEvalTemplate (): string', () => {
    describe('variant #1: simple', () => {
        const expectedGlobalObject: NodeJS.Global = global;

        let globalObject: NodeJS.Global;

        before(() => {
            const globalVariableNoEvalTemplate: string = format(GlobalVariableNoEvalTemplate());

            globalObject = Function(`
                ${globalVariableNoEvalTemplate}
                
                return that;
            `)();
        });

        it('should correctly return global object', () => {
            assert.deepEqual(globalObject, expectedGlobalObject);
        });
    });

    describe('variant #2: call inside function', () => {
        const expectedGlobalObject: NodeJS.Global = global;

        let globalObject: NodeJS.Global;

        before(() => {
            const globalVariableNoEvalTemplate: string = format(GlobalVariableNoEvalTemplate());

            globalObject = Function(`
                return (function () {
                    ${globalVariableNoEvalTemplate}
                    
                    return that;
                })();
            `)();
        });

        it('should correctly return global object', () => {
            assert.deepEqual(globalObject, expectedGlobalObject);
        });
    });

    describe('variant #3: return `window`', () => {
        const expectedGlobalObject: {} = {
            document: {}
        };

        let globalObject: NodeJS.Global;

        before(() => {
            const globalVariableNoEvalTemplate: string = format(GlobalVariableNoEvalTemplate());

            globalObject = Function(`
                this.window = {
                    document: {}
                };
            
                ${globalVariableNoEvalTemplate}
                
                return that;
            `)();
        });

        it('should correctly return `window` object', () => {
            assert.deepEqual(globalObject, expectedGlobalObject);
        });
    });
});
