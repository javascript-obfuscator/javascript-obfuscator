import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';

import { IIdentifierNamesGenerator } from '../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IManglePropertiesReplacer } from '../../../interfaces/node-transformers/mangle-properties-transformers/replacer/IManglePropertiesReplacer';
import { IOptions } from '../../../interfaces/options/IOptions';

import { ReservedDomProperties } from '../../../constants/ReservedDomProperties';

import { NodeGuards } from '../../../node/NodeGuards';
import { NodeFactory } from '../../../node/NodeFactory';

@injectable()
export class ManglePropertiesReplacer implements IManglePropertiesReplacer {
    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {Map<string, string>}
     * @private
     */
    private readonly mangledPropertyNamesMap: Map<string, string> = new Map();

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {Set<string>}
     */
    private readonly reservedDomPropertiesList: Set<string> = new Set(ReservedDomProperties);


    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.options = options;
    }

    /**
     * @param {ESTree.Identifier | ESTree.Literal} node
     * @returns {ESTree.Identifier | ESTree.Literal}
     */
    public replace (node: ESTree.Identifier | ESTree.Literal): ESTree.Identifier | ESTree.Literal {
        if (NodeGuards.isIdentifierNode(node)) {
            return NodeFactory.identifierNode(
                this.replacePropertyName(node.name)
            );
        }

        if (NodeGuards.isLiteralNode(node) && typeof node.value === 'string') {
            return NodeFactory.literalNode(
                this.replacePropertyName(node.value)
            );
        }

        return node;
    }

    /**
     * @param {string} propertyName
     * @returns {string}
     * @private
     */
    private replacePropertyName (propertyName: string): string {
        if (this.isReservedName(propertyName)) {
            return propertyName;
        }

        let mangledPropertyName: string | null = this.mangledPropertyNamesMap.get(propertyName) ?? null;

        if (mangledPropertyName !== null) {
            return mangledPropertyName;
        }

        mangledPropertyName = this.identifierNamesGenerator.generateNext();
        this.mangledPropertyNamesMap.set(propertyName, mangledPropertyName);

        return mangledPropertyName;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        return this.isReservedOptionName(name)
            || this.isReservedDomPropertyName(name);
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedOptionName (name: string): boolean {
        if (!this.options.reservedNames.length) {
            return false;
        }

        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').exec(name) !== null;
            });
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedDomPropertyName (name: string): boolean {
        return this.reservedDomPropertiesList.has(name);
    }
}
