import { inject, injectable, injectFromBase } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';

import { initializable } from '../../decorators/Initializable';

import { StringArrayTemplate } from './templates/string-array/StringArrayTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';
import { StringUtils } from '../../utils/StringUtils';
import { AtobTemplate } from './templates/string-array-calls-wrapper/AtobTemplate';
import { ICryptUtilsStringArray } from '../../interfaces/utils/ICryptUtilsStringArray';

@injectFromBase()
@injectable()
export class StringArrayCodeHelper extends AbstractCustomCodeHelper {
    /**
     * @type {IStringArrayStorage}
     */
    @initializable()
    private stringArrayStorage!: IStringArrayStorage;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayFunctionName!: string;
    private readonly cryptUtilsStringArray: ICryptUtilsStringArray;
    private prefixes: string[];

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {ICustomCodeHelperObfuscator} customCodeHelperObfuscator
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param cryptUtilsStringArray
     */
    public constructor(
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
        identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.ICustomCodeHelperObfuscator) customCodeHelperObfuscator: ICustomCodeHelperObfuscator,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.ICryptUtilsStringArray) cryptUtilsStringArray: ICryptUtilsStringArray
    ) {
        super(
            identifierNamesGeneratorFactory,
            customCodeHelperFormatter,
            customCodeHelperObfuscator,
            randomGenerator,
            options
        );

        this.cryptUtilsStringArray = cryptUtilsStringArray;
        this.prefixes = [];
    }

    /**
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {string} stringArrayFunctionName
     */
    public initialize(stringArrayStorage: IStringArrayStorage, stringArrayFunctionName: string): void {
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayFunctionName = stringArrayFunctionName;
        this.prefixes = [
            this.generatePNGPrefix(),
            this.generateJPGPrefix(),
            this.generateWEBPPrefix(),
            this.generateSVGPrefix()
        ];
    }

    /**
     * @param {string} codeHelperTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure(codeHelperTemplate: string): TStatement[] {
        return NodeUtils.convertCodeToStructure(codeHelperTemplate);
    }

    /**
     * @returns {string}
     */
    protected override getCodeHelperTemplate(): string {
        const imageClassName: string = this.identifierNamesGenerator.generateNext();
        const paramWidthName: string = this.identifierNamesGenerator.generateNext();
        const paramHeightName: string = this.identifierNamesGenerator.generateNext();
        const imageInstanceName: string = this.identifierNamesGenerator.generateNext();

        const atobFunctionName: string = this.identifierNamesGenerator.generateNext();
        const atobFunctionTemplate: string = this.identifierNamesGenerator.generateNext();

        const atobPolyfill: string = this.customCodeHelperFormatter.formatTemplate(
            AtobTemplate(this.options.selfDefending),
            {
                atobFunctionName
            }
        );

        const imagePrefix: string = this.randomGenerator.getRandomGenerator().pickone(this.prefixes);
        const payload = this.cryptUtilsStringArray.btoa(this.getStringArrayStorageItemsJSON());
        const imageSrc: string = `'${StringUtils.escapeJsString(imagePrefix + payload)}'`;
        const prefixLengthAkaWidth = imagePrefix.length;
        const dummyHeight = Math.floor(
            prefixLengthAkaWidth *
                this.randomGenerator.getRandomGenerator().pickone([16 / 9, 9 / 16, 1, 3 / 4, 4 / 3, 1])
        );

        return this.customCodeHelperFormatter.formatTemplate(StringArrayTemplate(this.options.selfDefending), {
            imageClassName: imageClassName,
            paramWidthName: paramWidthName,
            paramHeightName: paramHeightName,
            imageInstanceName: imageInstanceName,

            stringArrayFunctionName: this.stringArrayFunctionName,

            atobPolyfill: atobPolyfill,
            atobFunctionName: atobFunctionName,
            atobFunctionTemplate: atobFunctionTemplate,
            imageSrc: imageSrc,
            imageWidth: prefixLengthAkaWidth,
            imageHeight: dummyHeight
        });
    }

    /**
     * @returns {string}
     */
    private getStringArrayStorageItemsJSON(): string {
        return JSON.stringify(
            Array.from(this.stringArrayStorage.getStorage().values()).map(
                (stringArrayStorageItemData: IStringArrayStorageItemData): string =>
                    stringArrayStorageItemData.encodedValue
            )
        ).toString();
    }

    private generatePNGPrefix(): string {
        let imagePrefix: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA';
        const iterations: number = this.randomGenerator.getRandomInteger(4, 8);
        for (let i: number = 0; i < iterations; i++) {
            imagePrefix += this.randomGenerator.getRandomString(this.randomGenerator.getRandomInteger(4, 8));
            imagePrefix += 'A'.repeat(this.randomGenerator.getRandomInteger(2, 8));
        }
        imagePrefix += this.randomGenerator.getRandomString(this.randomGenerator.getRandomInteger(4, 64));
        imagePrefix += 'A'.repeat(16 * this.randomGenerator.getRandomInteger(0, 1));
        imagePrefix += this.randomGenerator.getRandomString(32 - (imagePrefix.length % 16));

        return imagePrefix;
    }

    private generateJPGPrefix(): string {
        let imagePrefix: string = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAk';
        const iterations: number = this.randomGenerator.getRandomInteger(4, 8);
        for (let i: number = 0; i < iterations; i++) {
            imagePrefix += this.randomGenerator.getRandomString(4 * this.randomGenerator.getRandomInteger(4, 8));
            imagePrefix += '/';
        }
        imagePrefix += this.randomGenerator.getRandomString(this.randomGenerator.getRandomInteger(4, 64));
        imagePrefix += 'A'.repeat(16 * this.randomGenerator.getRandomInteger(0, 1));
        imagePrefix += this.randomGenerator.getRandomString(32 - (imagePrefix.length % 16));

        return imagePrefix;
    }

    private generateWEBPPrefix(): string {
        const randomThreeLetters = this.randomGenerator.getRandomString(3);
        let imagePrefix: string = `data:image/webp;base64,UklGR${randomThreeLetters}AABXRUJQVlA4`;
        const iterations: number = this.randomGenerator.getRandomInteger(4, 8);
        for (let i: number = 0; i < iterations; i++) {
            imagePrefix += this.randomGenerator.getRandomString(this.randomGenerator.getRandomInteger(8, 24));
            imagePrefix += '/'.repeat(this.randomGenerator.getRandomInteger(1, 2));
        }
        imagePrefix += this.randomGenerator.getRandomString(this.randomGenerator.getRandomInteger(4, 64));
        imagePrefix += 'A'.repeat(16 * this.randomGenerator.getRandomInteger(0, 1));
        imagePrefix += this.randomGenerator.getRandomString(32 - (imagePrefix.length % 16));

        return imagePrefix;
    }

    private generateSVGPrefix(): string {
        let imagePrefix: string = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI';
        imagePrefix += this.randomGenerator.getRandomString(this.randomGenerator.getRandomInteger(64, 256));
        imagePrefix += 'A'.repeat(16 * this.randomGenerator.getRandomInteger(0, 1));
        imagePrefix += this.randomGenerator.getRandomString(32 - (imagePrefix.length % 16));

        return imagePrefix;
    }
}
