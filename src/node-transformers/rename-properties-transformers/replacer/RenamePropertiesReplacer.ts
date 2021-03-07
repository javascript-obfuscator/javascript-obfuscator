/* eslint-disable no-console */
import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';

import { IIdentifierNamesGenerator } from '../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IRenamePropertiesReplacer } from '../../../interfaces/node-transformers/rename-properties-transformers/replacer/IRenamePropertiesReplacer';
import { IOptions } from '../../../interfaces/options/IOptions';

// eslint-disable-next-line import/no-internal-modules
import ReservedDomProperties from './ReservedDomProperties.json';

import { NodeGuards } from '../../../node/NodeGuards';
import { NodeFactory } from '../../../node/NodeFactory';

@injectable()
export class RenamePropertiesReplacer implements IRenamePropertiesReplacer {
    /**
     * Properties list taken from `UglifyJS` and `terser`
     * https://github.com/mishoo/UglifyJS/blob/master/tools/domprops.json
     * https://github.com/terser/terser/blob/master/tools/domprops.js
     * Copyright 2012-2018 (c) Mihai Bazon <mihai.bazon@gmail.com>
     *
     * @type {Set<string>}
     */
    private static readonly reservedDomPropertiesList: Set<string> = new Set(ReservedDomProperties);

    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {Set<string>}
     */
    private readonly excludedPropertyNames: Set<string> = new Set();

    /**
     * @type {Map<string, string>}
     * @private
     */
    private readonly propertyNamesMap: Map<string, string> = new Map();

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

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
     * @param {string} propertyName
     */
    public excludePropertyName (propertyName: string): void {
       this.excludedPropertyNames.add(propertyName);
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

        let renamedPropertyName: string | null = this.propertyNamesMap.get(propertyName) ?? null;

        if (renamedPropertyName !== null) {
            return renamedPropertyName;
        }

        renamedPropertyName = this.identifierNamesGenerator.generateNext();
        this.propertyNamesMap.set(propertyName, renamedPropertyName);

        return renamedPropertyName;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        return this.isExcludedName(name)
            || this.isReservedOptionName(name)
            || this.isReservedDomPropertyName(name);
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isExcludedName (name: string): boolean {
        return this.excludedPropertyNames.has(name);
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
        return RenamePropertiesReplacer.reservedDomPropertiesList.has(name);
    }
}
