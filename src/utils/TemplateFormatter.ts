import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as ESTree from 'estree';
import format from 'string-template';

import { TObject } from '../types/TObject';

import { IPrevailingKindOfVariablesAnalyzer } from '../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
import { ITemplateFormatter } from '../interfaces/utils/ITemplateFormatter';

@injectable()
export class TemplateFormatter implements ITemplateFormatter {
    /**
     * @type {IPrevailingKindOfVariablesAnalyzer}
     */
    private readonly prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer;

    /**
     * @param {IPrevailingKindOfVariablesAnalyzer} prevailingKindOfVariablesAnalyzer
     */
    constructor (
        @inject(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
            prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer,
    ) {
        this.prevailingKindOfVariablesAnalyzer = prevailingKindOfVariablesAnalyzer;
    }

    public format <TMapping extends TObject> (
        template: string,
        mapping: TMapping
    ): string {
        const formattedTemplate: string = format(template, mapping);
        const prevailingKindOfVariables: ESTree.VariableDeclaration['kind'] =
            this.prevailingKindOfVariablesAnalyzer.getPrevailingKind();

        return this.replaceKindOfVariablesToPrevailingKind(formattedTemplate, prevailingKindOfVariables);
    }

    /**
     * @param {string} template
     * @param {ESTree.VariableDeclaration['kind']} prevailingKindOfVariables
     * @returns {string}
     */
    private replaceKindOfVariablesToPrevailingKind (
        template: string,
        prevailingKindOfVariables: ESTree.VariableDeclaration['kind']
    ): string {
        return prevailingKindOfVariables === 'var'
            ? template.replace(/(?<!\w)(?:let|const)(?!\w)/g, prevailingKindOfVariables)
            : template;
    }
}
