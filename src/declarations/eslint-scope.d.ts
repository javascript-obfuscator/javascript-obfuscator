/* eslint-disable */

import * as eslint from 'eslint';
import * as eslintScope from 'eslint-scope';

declare module 'eslint-scope' {
    interface Variable {
        scope: Scope;
    }

    interface Definition {
        type: eslint.Scope.Definition['type'];
    }
}
