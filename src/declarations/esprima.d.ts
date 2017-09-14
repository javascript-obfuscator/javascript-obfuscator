/* tslint:disable:interface-name */

import * as esprima from 'esprima';

declare module 'esprima' {
    export interface ParseOptions {
        attachComment?: boolean;
    }
}
