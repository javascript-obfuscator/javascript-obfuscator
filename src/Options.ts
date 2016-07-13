import * as Joi from 'joi';

import { IObfuscatorOptions } from "./interfaces/IObfuscatorOptions";
import { IOptions } from "./interfaces/IOptions";

import { TSourceMapMode } from "./types/TSourceMapMode";

import { DEFAULT_PRESET } from "./preset-options/DefaultPreset";

import { OptionsNormalizer } from "./OptionsNormalizer";

export class Options implements IOptions {
    /**
     * @type {boolean}
     */
    public readonly compact: boolean;

    /**
     * @type {boolean}
     */
    public readonly debugProtection: boolean;

    /**
     * @type {boolean}
     */
    public readonly debugProtectionInterval: boolean;

    /**
     * @type {boolean}
     */
    public readonly disableConsoleOutput: boolean;

    /**
     * @type {boolean}
     */
    public readonly encodeUnicodeLiterals: boolean;

    /**
     * @type {string[]}
     */
    public readonly reservedNames: string[];

    /**
     * @type {boolean}
     */
    public readonly rotateUnicodeArray: boolean;

    /**
     * @type {boolean}
     */
    public readonly selfDefending: boolean;

    /**
     * @type {boolean}
     */
    public readonly sourceMap: boolean;

    /**
     * @type {TSourceMapMode}
     */
    public readonly sourceMapMode: TSourceMapMode;

    /**
     * @type {boolean}
     */
    public readonly unicodeArray: boolean;

    /**
     * @type {number}
     */
    public readonly unicodeArrayThreshold: number;

    /**
     * @type {boolean}
     */
    public readonly wrapUnicodeArrayCalls: boolean;

    /**
     * @type {Joi.ObjectSchema}
     */
    private schema: Joi.ObjectSchema = Joi.object({
        compact: Joi.boolean(),
        debugProtection: Joi.boolean(),
        debugProtectionInterval: Joi.boolean(),
        disableConsoleOutput: Joi.boolean(),
        encodeUnicodeLiterals: Joi.boolean(),
        reservedNames: Joi.array().items(Joi.string()),
        rotateUnicodeArray: Joi.boolean(),
        selfDefending: Joi.boolean(),
        sourceMap: Joi.boolean(),
        sourceMapMode: Joi.string().allow(['inline', 'separate']),
        unicodeArray: Joi.boolean(),
        unicodeArrayThreshold: Joi.number().min(0).max(1),
        wrapUnicodeArrayCalls: Joi.boolean()
    });

    /**
     * @param obfuscatorOptions
     */
    constructor (obfuscatorOptions: IObfuscatorOptions) {
        Joi.validate(obfuscatorOptions, this.schema, (error: Joi.ValidationError) => {
            if (error) {
                throw error;
            }
        });

        Object.assign(
            this,
            OptionsNormalizer.normalizeOptions(Object.assign({}, DEFAULT_PRESET, obfuscatorOptions))
        );
    }
}
