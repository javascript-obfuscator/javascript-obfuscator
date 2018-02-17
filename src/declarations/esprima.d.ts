/* tslint:disable:interface-name */

import * as esprima from 'esprima';

declare module 'esprima' {
    export interface LineMeta {
        line?: number;
        column?: number;
        offset?: number;
    }

    export interface NodeMeta {
        start?: LineMeta;
        end?: LineMeta;
    }

    export interface ParseOptions {
        attachComment?: boolean;
    }
}
