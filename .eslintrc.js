module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "src/tsconfig.node.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "import",
        "jsdoc",
        "prefer-arrow",
        "unicorn"
    ],
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "array"
            }
        ],
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/brace-style": [
            "error",
            "1tbs",
            {
                "allowSingleLine": true
            }
        ],
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/comma-spacing": "error",
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            {
                "assertionStyle": "angle-bracket"
            }
        ],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/default-param-last": "error",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit"
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/func-call-spacing": "error",
        "@typescript-eslint/indent": [
            "off",
            4
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "default",
                "format": ["camelCase", "PascalCase"]
            },
            {
                "selector": "variable",
                "format": ["camelCase", "PascalCase", "UPPER_CASE"]
            },
            {
                "selector": "function",
                "format": ["camelCase", "PascalCase"]
            },
            {
                "selector": "class",
                "format": ["PascalCase"]
            },
            {
                "selector": "interface",
                "format": ["PascalCase"],
                "prefix": ["I"]
            },
            {
                "selector": "typeAlias",
                "format": ["PascalCase"],
                "prefix": ["T"]
            },
            {
                "selector": "typeParameter",
                "format": ["PascalCase"]
            },
            {
                "selector": "enum",
                "format": ["PascalCase"]
            },
            {
                "selector": "enumMember",
                "format": null
            },
            {
                "selector": "property",
                "format": ["camelCase", "PascalCase", "snake_case"]
            }
        ],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-parens": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-param-reassign": "off",
        "@typescript-eslint/no-parameter-properties": "error",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/quotes": [
            "error",
            "single"
        ],
        "@typescript-eslint/require-array-sort-compare": "error",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/space-before-function-paren": "error",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/typedef": "error",
        "@typescript-eslint/unified-signatures": "error",
        "arrow-body-style": "off",
        "arrow-parens": [
            "off",
            "as-needed"
        ],
        "brace-style": "off",
        "capitalized-comments": "off",
        "comma-dangle": "off",
        "comma-spacing": "off",
        "complexity": [
            "error",
            {
                "max": 10
            }
        ],
        "constructor-super": "error",
        "curly": "error",
        "default-case": "off",
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "func-call-spacing": "off",
        "guard-for-in": "error",
        "id-blacklist": "off",
        "id-match": "off",
        "import/export": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-absolute-path": "error",
        "import/no-cycle": "error",
        "import/no-default-export": "error",
        "import/no-deprecated": "error",
        "import/no-extraneous-dependencies": "error",
        "import/no-internal-modules": "error",
        "import/no-mutable-exports": "error",
        "import/no-unassigned-import": "off",
        "import/no-useless-path-segments": "error",
        "import/order": "off",
        "indent": "off",
        "jsdoc/no-types": "off",
        "linebreak-style": "off",
        "max-classes-per-file": [
            "error",
            1
        ],
        "max-len": "off",
        "max-lines": [
            "error",
            500
        ],
        "new-parens": "error",
        "newline-per-chained-call": "off",
        "no-bitwise": "off",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": [
            "error",
            {
                "allow": [
                    "log",
                    "warn",
                    "dir",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "error",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context"
                ]
            }
        ],
        "no-constant-condition": "error",
        "no-control-regex": "off",
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "off",
        "no-eval": "off",
        "no-extra-bind": "error",
        "no-extra-parens": "off",
        "no-extra-semi": "error",
        "no-fallthrough": "error",
        "no-invalid-regexp": "error",
        "no-invalid-this": "off",
        "no-irregular-whitespace": "error",
        "no-magic-numbers": "off",
        "no-multi-str": "error",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-null/no-null": "off",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-restricted-syntax": [
            "error",
            "ForInStatement"
        ],
        "no-return-await": "error",
        "no-sequences": "error",
        "no-shadow": "off",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": [
            "error",
            {
                "skipBlankLines": true
            }
        ],
        "no-undef-init": "error",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "off",
        "no-unused-labels": "error",
        "no-var": "error",
        "no-void": "error",
        "object-shorthand": "off",
        "one-var": [
            "error",
            "never"
        ],
        "padding-line-between-statements": [
            "error",
            {
                "blankLine": "always",
                "prev": "*",
                "next": "return"
            }
        ],
        "prefer-arrow/prefer-arrow-functions": "off",
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "prefer-template": "error",
        "quote-props": [
            "error",
            "as-needed"
        ],
        "quotes": "off",
        "radix": "error",
        "space-before-function-paren": "off",
        "spaced-comment": "error",
        "space-in-parens": [
            "error",
            "never"
        ],
        "unicorn/catch-error-name": [
            "error",
            {
                "name": "error"
            }
        ],
        "unicorn/no-nested-ternary": "error",
        "unicorn/no-unreadable-array-destructuring": "error",
        "unicorn/prefer-includes": "error",
        "unicorn/prefer-starts-ends-with": "error",
        "unicorn/prefer-trim-start-end": "error",
        "use-isnan": "error",
        "valid-typeof": "error",
        "yoda": "error"
    }
};
