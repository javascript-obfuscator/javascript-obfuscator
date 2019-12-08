import { inject, injectable } from 'inversify';
import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';
import * as estraverse from "estraverse";

import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { NodeGuards } from "../../node/NodeGuards";

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';

@injectable()
export class MangledIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
     * @type {string}
     */
    private static readonly initMangledNameCharacter: string = '9';

    /**
     * @type {Map<eslintScope.Scope, string>}
     */
    private static readonly lastMangledNameInScopeMap: Map <eslintScope.Scope, string> = new Map();

    /**
     * @type {string[]}
     */
    private static readonly nameSequence: string[] =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    /**
     * Reserved JS words with length of 2-4 symbols that can be possible generated with this replacer
     *
     * @type {string[]}
     */
    private static readonly reservedNames: string[] = [
        'byte', 'case', 'char', 'do', 'else', 'enum', 'eval', 'for', 'goto',
        'if', 'in', 'int', 'let', 'long', 'new', 'null', 'this', 'true', 'try',
        'var', 'void', 'with'
    ];

    /**
     * @type {string}
     */
    private previousMangledName: string = MangledIdentifierNamesGenerator.initMangledNameCharacter;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * We can only ignore limited nameLength, it has no sense here
     * @param {number} nameLength
     * @returns {string}
     */
    public generate (nameLength?: number): string {
        const identifierName: string = this.generateNewMangledName(this.previousMangledName);

        this.previousMangledName = identifierName;

        return identifierName;
    }

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public generateWithPrefix (nameLength?: number): string {
        const prefix: string = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}_`
            : '';
        const identifierName: string = this.generate(nameLength);

        return `${prefix}${identifierName}`;
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} blockScopeNode
     * @returns {string}
     */
    public generateForBlockScope (identifierNode: ESTree.Identifier, blockScopeNode: TNodeWithLexicalScope): string {
        const scope: eslintScope.Scope | null | undefined = identifierNode.scope;

        if (!scope) {
            return this.generate();
        }

        const previousIdentifierName: string = identifierNode.name;

        let newIdentifierName: string = this.getLastMangledNameForScope(scope);
        do {
            newIdentifierName = this.generateNewMangledName(newIdentifierName);
        } while (!this.isUniqueIdentifierNameInScope(newIdentifierName, scope));

        MangledIdentifierNamesGenerator.lastMangledNameInScopeMap.set(scope, newIdentifierName);

        estraverse.traverse(blockScopeNode, {
            enter: (node: ESTree.Node): void => {
                if (NodeGuards.isIdentifierNode(node) && node.scope) {
                    const nodeScope: eslintScope.Scope | null | undefined = node.scope;
                    const scopeVariable: ESTree.Variable | undefined = scope.set.get(previousIdentifierName);
                    nodeScope.set.delete(previousIdentifierName);
                    if (scopeVariable) {
                        scopeVariable.name = newIdentifierName;
                        scopeVariable.isRenamed = true;
                        nodeScope.set.set(newIdentifierName, scopeVariable);
                    }
                }
            }});

        return newIdentifierName;
    }

    /**
     * @param {string} mangledName
     * @returns {boolean}
     */
    public isValidIdentifierName (mangledName: string): boolean {
        return super.isValidIdentifierName(mangledName)
            && !MangledIdentifierNamesGenerator.reservedNames.includes(mangledName);
    }

    /**
     * @param {string} identifierName
     * @param {Scope} scope
     * @returns {boolean}
     */
    private isDeclaredInParentScope (identifierName: string, scope: eslintScope.Scope): boolean {
        const upperScope: eslintScope.Scope | null = scope.upper;
        if (!upperScope) {
            return false;
        }
        const exitingVariable: ESTree.Variable | undefined = upperScope.set.get(identifierName);

        return (exitingVariable && exitingVariable.isRenamed) || this.isDeclaredInParentScope(identifierName, upperScope);
    }

    /**
     * @param {string} identifierName
     * @param {Scope} scope
     * @returns {boolean}
     */
    private isUniqueIdentifierNameInScope (identifierName: string, scope: eslintScope.Scope): boolean {
        if ((<any>scope).taints.has(identifierName)) {
            return false;
        }

        for (const through of scope.through) {
            if (through.identifier.name === identifierName) {
                return false;
            }
        }

        return !this.isDeclaredInParentScope(identifierName, scope);
    }

    /**
     * @param {string} previousMangledName
     * @returns {string}
     */
    private generateNewMangledName (previousMangledName: string): string {
        const generateNewMangledName: (name: string) => string = (name: string): string => {
            const nameSequence: string[] = MangledIdentifierNamesGenerator.nameSequence;
            const nameLength: number = name.length;

            const zeroSequence: (num: number) => string = (num: number): string => {
                return '0'.repeat(num);
            };

            let index: number = nameLength - 1;

            do {
                const character: string = name.charAt(index);
                const indexInSequence: number = nameSequence.indexOf(character);
                const lastNameSequenceIndex: number = nameSequence.length - 1;

                if (indexInSequence !== lastNameSequenceIndex) {
                    const previousNamePart: string = name.substring(0, index);
                    const nextCharacter: string = nameSequence[indexInSequence + 1];
                    const zeroSequenceLength: number = nameLength - (index + 1);
                    const zeroSequenceCharacters: string = zeroSequence(zeroSequenceLength);

                    return previousNamePart + nextCharacter + zeroSequenceCharacters;
                }

                --index;
            } while (index >= 0);

            return `a${zeroSequence(nameLength)}`;
        };

        let newMangledName: string = generateNewMangledName(previousMangledName);

        if (!this.isValidIdentifierName(newMangledName)) {
            newMangledName = this.generateNewMangledName(newMangledName);
        }

        return newMangledName;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     */
    private getLastMangledNameForScope (scope: eslintScope.Scope): string {
        return MangledIdentifierNamesGenerator.lastMangledNameInScopeMap.has(scope)
            ? <string>MangledIdentifierNamesGenerator.lastMangledNameInScopeMap.get(scope)
            : this.previousMangledName;
    }
}
