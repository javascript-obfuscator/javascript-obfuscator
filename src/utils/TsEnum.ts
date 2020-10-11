/* eslint-disable no-redeclare */
/**
 * https://github.com/gradecam/tsenum
 */
export function MakeEnum<T1 extends {[index: string]: U}, U extends string> (x1: T1): Readonly<T1>;
export function MakeEnum<T1 extends {[index: string]: U}
    , T2 extends {[index: string]: U}
    , U extends string> (x1: T1, x2: T2): Readonly<T1 & T2>;
export function MakeEnum<T1 extends {[index: string]: U}
    , T2 extends {[index: string]: U}
    , T3 extends {[index: string]: U}
    , U extends string> (x1: T1, x2: T2, x3: T3): Readonly<T1 & T2 & T3>;
export function MakeEnum<T1 extends {[index: string]: U}
    , T2 extends {[index: string]: U}
    , T3 extends {[index: string]: U}
    , T4 extends {[index: string]: U}
    , U extends string> (x1: T1, x2: T2, x3: T3, x4: T4): Readonly<T1 & T2 & T3 & T4>;
export function MakeEnum<T1 extends {[index: string]: U}
    , T2 extends {[index: string]: U}
    , T3 extends {[index: string]: U}
    , T4 extends {[index: string]: U}
    , T5 extends {[index: string]: U}
    , U extends string> (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5): Readonly<T1 & T2 & T3 & T4 & T5>;
export function MakeEnum<T1 extends {[index: string]: U}
    , T2 extends {[index: string]: U}
    , T3 extends {[index: string]: U}
    , T4 extends {[index: string]: U}
    , T5 extends {[index: string]: U}
    , T6 extends {[index: string]: U}
    , U extends string> (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6): Readonly<T1 & T2 & T3 & T4 & T5 & T6>;
export function MakeEnum<T1 extends {[index: string]: U}
    , T2 extends {[index: string]: U}
    , T3 extends {[index: string]: U}
    , T4 extends {[index: string]: U}
    , T5 extends {[index: string]: U}
    , T6 extends {[index: string]: U}
    , T7 extends {[index: string]: U}
    , U extends string> (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7): Readonly<T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function MakeEnum<T1 extends {[index: string]: U}
    , T2 extends {[index: string]: U}
    , T3 extends {[index: string]: U}
    , T4 extends {[index: string]: U}
    , T5 extends {[index: string]: U}
    , T6 extends {[index: string]: U}
    , T7 extends {[index: string]: U}
    , T8 extends {[index: string]: U}
    , U extends string> (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7, x8: T8): Readonly<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function MakeEnum<T1 extends {[index: string]: U}
    , T2 extends {[index: string]: U}
    , T3 extends {[index: string]: U}
    , T4 extends {[index: string]: U}
    , T5 extends {[index: string]: U}
    , T6 extends {[index: string]: U}
    , T7 extends {[index: string]: U}
    , T8 extends {[index: string]: U}
    , T9 extends {[index: string]: U}
    , U extends string> (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7, x8: T8, x9: T9): Readonly<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;

export function MakeEnum<T extends {[index: string]: U}, U extends string> (...x: T[]): Readonly<T> {
    return Object.freeze(Object.assign({}, ...x));
}
