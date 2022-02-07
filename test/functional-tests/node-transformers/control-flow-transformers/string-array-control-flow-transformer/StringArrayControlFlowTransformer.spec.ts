import { assert } from 'chai';

import {
    IdentifierNamesGenerator
} from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import {
    StringArrayIndexesType
} from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayControlFlowTransformer', function () {
    this.timeout(100000);

    const hexadecimalVariableMatch: string = '_0x([a-f0-9]){4,6}';

    describe('transformNode', () => {
        describe('Variant #1 - hexadecimal number generator', () => {
            const stringArrayVariableMatch: string = '_0x([a-f0-9]){4}';

            const controlFlowStorageMatch: string = `var ${hexadecimalVariableMatch} *= *\\{` +
                `${hexadecimalVariableMatch} *: *0x0, *` +
                `${hexadecimalVariableMatch} *: *0x1 *` +
            `\\};`;
            const controlFlowStorageCallMatch: string = `${stringArrayVariableMatch}\\(${hexadecimalVariableMatch}.${hexadecimalVariableMatch}\\)`;

            describe('Variant #1 - positive cases', () => {
                describe('Variant #1 - hexadecimal number items', () => {
                    const controlFlowStorageRegExp: RegExp = new RegExp(controlFlowStorageMatch);

                    const controlFlowStorageCallRegExp: RegExp = new RegExp(
                        `var ${hexadecimalVariableMatch} *= *${controlFlowStorageCallMatch} *\\+ *${controlFlowStorageCallMatch};`
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                stringArray: true,
                                stringArrayThreshold: 1,
                                stringArrayIndexesType: [StringArrayIndexesType.HexadecimalNumber],
                                stringArrayCallsTransform: true,
                                stringArrayCallsTransformThreshold: 1
                            }
                        ).getObfuscatedCode();
                    });

                    it('should add `control flow storage` node to the obfuscated code', () => {
                        assert.match(obfuscatedCode, controlFlowStorageRegExp);
                    });

                    it('should add calls to `control flow storage` node to the obfuscated code', () => {
                        assert.match(obfuscatedCode, controlFlowStorageCallRegExp);
                    });
                });

                describe('Variant #2 - hexadecimal numeric string items', () => {
                    const controlFlowStorageRegExp: RegExp = new RegExp(
                        `var ${hexadecimalVariableMatch} *= *\\{` +
                            `${hexadecimalVariableMatch} *: *'0x0', *` +
                            `${hexadecimalVariableMatch} *: *'0x1' *` +
                        `\\};`
                    );

                    const controlFlowStorageCallRegExp: RegExp = new RegExp(
                        `var ${hexadecimalVariableMatch} *= *${controlFlowStorageCallMatch} *\\+ *${controlFlowStorageCallMatch};`
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                stringArray: true,
                                stringArrayThreshold: 1,
                                stringArrayIndexesType: [StringArrayIndexesType.HexadecimalNumericString],
                                stringArrayCallsTransform: true,
                                stringArrayCallsTransformThreshold: 1
                            }
                        ).getObfuscatedCode();
                    });

                    it('should add `control flow storage` node to the obfuscated code', () => {
                        assert.match(obfuscatedCode, controlFlowStorageRegExp);
                    });

                    it('should add calls to `control flow storage` node to the obfuscated code', () => {
                        assert.match(obfuscatedCode, controlFlowStorageCallRegExp);
                    });
                });

                describe('Variant #3 - two scopes for `control flow storage` node', () => {
                    const expectedAppendToScopeThreshold: number = 0.5;

                    const samplesCount: number = 1000;
                    const delta: number = 0.1;

                    const regExp1: RegExp = new RegExp(
                        `\\(function\\(\\) *\\{ *${controlFlowStorageMatch}`,
                    );
                    const regExp2: RegExp = new RegExp(
                        `function *${hexadecimalVariableMatch} *\\(${hexadecimalVariableMatch}\\) *\\{ *${controlFlowStorageMatch}`,
                    );

                    let appendToScopeThreshold1: number = 0;
                    let appendToScopeThreshold2: number = 0;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/input-2.js');

                        let obfuscatedCode: string,
                            totalValue1: number = 0,
                            totalValue2: number = 0;

                        for (let i = 0; i < samplesCount; i++) {
                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    stringArray: true,
                                    stringArrayThreshold: 1,
                                    stringArrayCallsTransform: true,
                                    stringArrayCallsTransformThreshold: 1
                                }
                            ).getObfuscatedCode();

                            if (!regExp1.test(obfuscatedCode) && !regExp2.test(obfuscatedCode)) {
                                console.log(obfuscatedCode);
                            }

                            if (regExp1.test(obfuscatedCode)) {
                                totalValue1++;
                            }

                            if (regExp2.test(obfuscatedCode)) {
                                totalValue2++;
                            }
                        }

                        appendToScopeThreshold1 = totalValue1 / samplesCount;
                        appendToScopeThreshold2 = totalValue2 / samplesCount;
                    });

                    it('should add `control flow storage` node to the obfuscated code in one of the scopes', () => {
                        assert.closeTo(appendToScopeThreshold1, expectedAppendToScopeThreshold, delta);
                        assert.closeTo(appendToScopeThreshold2, expectedAppendToScopeThreshold, delta);
                    });
                });

                describe('Variant #4 - single `control flow storage` node with four items', () => {
                    const regexp: RegExp = new RegExp(
                        `var ${hexadecimalVariableMatch} *= *\\{` +
                            `${hexadecimalVariableMatch} *: *0x0, *` +
                            `${hexadecimalVariableMatch} *: *0x1, *` +
                            `${hexadecimalVariableMatch} *: *0x2, *` +
                            `${hexadecimalVariableMatch} *: *0x3 *` +
                        `\\};`
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/multiple-items.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                stringArray: true,
                                stringArrayThreshold: 1,
                                stringArrayCallsTransform: true,
                                stringArrayCallsTransformThreshold: 1
                            }
                        ).getObfuscatedCode();
                    });

                    it('should add `control flow storage` node with multiple items to the obfuscated code', () => {
                        assert.match(obfuscatedCode, regexp);
                    });
                });

                describe('Variant #5 - multiple `control flow storages` on the same block scope', () => {
                    const regexp: RegExp = new RegExp(
                        `var ${hexadecimalVariableMatch} *= *\\{` +
                            `${hexadecimalVariableMatch} *: *0x0, *` +
                            `${hexadecimalVariableMatch} *: *0x1 *` +
                        `\\}; *` +
                        `var ${hexadecimalVariableMatch} *= *\\{` +

                            `${hexadecimalVariableMatch} *: *0x2, *` +
                            `${hexadecimalVariableMatch} *: *0x3 *` +
                        `\\};`
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/multiple-storages-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                stringArray: true,
                                stringArrayThreshold: 1,
                                stringArrayCallsTransform: true,
                                stringArrayCallsTransformThreshold: 1
                            }
                        ).getObfuscatedCode();

                        console.log(obfuscatedCode);
                    });

                    it('should add `control flow storage` node with multiple items to the obfuscated code', () => {
                        assert.match(obfuscatedCode, regexp);
                    });
                });
            });

            describe('Variant #2 - negative cases', function () {
                describe('Variant #1 - string array call in the root block scope', () => {
                    const stringArrayCallsRegExp: RegExp = new RegExp(
                        `var test *= *${stringArrayVariableMatch}\\(0x0\\) *\\+ *${stringArrayVariableMatch}\\(0x1\\);`
                    );
                    const controlFlowStorageRegExp: RegExp = new RegExp(controlFlowStorageMatch);

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/root-block-scope-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                stringArray: true,
                                stringArrayThreshold: 1,
                                stringArrayCallsTransform: true,
                                stringArrayCallsTransformThreshold: 1
                            }
                        ).getObfuscatedCode();
                        console.log(obfuscatedCode);
                    });

                    it('shouldn\'t add control flow storage node', () => {
                        assert.notMatch(obfuscatedCode, controlFlowStorageRegExp);
                        assert.match(obfuscatedCode, stringArrayCallsRegExp);
                    });
                });

                describe('Variant #2 - threshold is `0`', () => {
                    const stringArrayCallsRegExp: RegExp = new RegExp(
                        `var ${hexadecimalVariableMatch} *= *${stringArrayVariableMatch}\\(0x0\\) *\\+ *${stringArrayVariableMatch}\\(0x1\\);`
                    );
                    const controlFlowStorageRegExp: RegExp = new RegExp(controlFlowStorageMatch);

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                stringArray: true,
                                stringArrayThreshold: 1,
                                stringArrayCallsTransform: true,
                                stringArrayCallsTransformThreshold: 0
                            }
                        ).getObfuscatedCode();

                        console.log(obfuscatedCode);
                    });

                    it('shouldn\'t add control flow storage node', () => {
                        assert.notMatch(obfuscatedCode, controlFlowStorageRegExp);
                        assert.match(obfuscatedCode, stringArrayCallsRegExp);
                    });
                });
            });
        });

        describe('Variant #2 - mangled number generator', () => {
            describe('Variant #1 - single control flow storage', () => {
                const controlFlowStorageRegExp: RegExp = new RegExp(
                    `var d *= *\\{` +
                        `c *: *0x0, *` +
                        `e *: *0x1 *` +
                    `\\};`
                );
                const controlFlowStorageCallRegExp: RegExp = new RegExp(
                    `var c *= *b\\(d.c\\) *\\+ *b\\(d.e\\);`
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayCallsTransform: true,
                            stringArrayCallsTransformThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add `control flow storage` node to the obfuscated code', () => {
                    assert.match(obfuscatedCode, controlFlowStorageRegExp);
                });

                it('should add calls to `control flow storage` node to the obfuscated code', () => {
                    assert.match(obfuscatedCode, controlFlowStorageCallRegExp);
                });
            });

            describe('Variant #2 - multiple control flow storages', () => {
                const controlFlowStorageRegExp1: RegExp = new RegExp(
                    `var d *= *\\{` +
                        `c *: *0x0, *` +
                        `e *: *0x1 *` +
                    `\\};`
                );
                const controlFlowStorageCallRegExp1: RegExp = new RegExp(
                    `var c *= *b\\(d.c\\) *\\+ *b\\(d.e\\);`
                );

                const controlFlowStorageRegExp2: RegExp = new RegExp(
                    `var e *= *\\{` +
                    `c *: *0x0, *` +
                    `f *: *0x1 *` +
                    `\\};`
                );
                const controlFlowStorageCallRegExp2: RegExp = new RegExp(
                    `var c *= *b\\(e.c\\) *\\+ *b\\(e.f\\);`
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/multiple-storages-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayCallsTransform: true,
                            stringArrayCallsTransformThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should add `control flow storage` №1 and its calls to the obfuscated code', () => {
                    assert.match(obfuscatedCode, controlFlowStorageRegExp1);
                    assert.match(obfuscatedCode, controlFlowStorageCallRegExp1);
                });

                it('Match #2: should add `control flow storage` №2 and its calls to the obfuscated code', () => {
                    assert.match(obfuscatedCode, controlFlowStorageRegExp2);
                    assert.match(obfuscatedCode, controlFlowStorageCallRegExp2);
                });
            });
        });

        describe('Variant #3 - prevailing kind of variables', () => {
            describe('Variant #1 - `var` kind', () => {
                const regexp: RegExp = new RegExp(`var ${hexadecimalVariableMatch} *= *\\{`);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-var.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayCallsTransform: true,
                            stringArrayCallsTransformThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should use correct kind of variables for `control flow storage`', () => {
                    assert.match(obfuscatedCode, regexp);
                });
            });

            describe('Variant #2 - `const` kind', () => {
                const regexp: RegExp = new RegExp(`const ${hexadecimalVariableMatch} *= *\\{`);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayCallsTransform: true,
                            stringArrayCallsTransformThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should use correct kind of variables for `control flow storage`', () => {
                    assert.match(obfuscatedCode, regexp);
                });
            });

            describe('Variant #3 - `let` kind', () => {
                const regexp: RegExp = new RegExp(`const ${hexadecimalVariableMatch} *= *\\{`);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-let.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayCallsTransform: true,
                            stringArrayCallsTransformThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should use correct kind of variables for `control flow storage`', () => {
                    assert.match(obfuscatedCode, regexp);
                });
            });
        });
    });
});
