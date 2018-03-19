import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import format from 'string-template';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICryptUtils } from '../../interfaces/utils/ICryptUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

import { initializable } from '../../decorators/Initializable';

import { DomainLockNodeTemplate } from '../../templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate';
import { GlobalVariableNoEvalTemplate } from '../../templates/GlobalVariableNoEvalTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class DomainLockNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName!: string;

    /**
     * @type {ICryptUtils}
     */
    private readonly cryptUtils: ICryptUtils;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {ICryptUtils} cryptUtils
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.ICryptUtils) cryptUtils: ICryptUtils,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);

        this.cryptUtils = cryptUtils;
    }

    /**
     * @param {string} callsControllerFunctionName
     */
    public initialize (callsControllerFunctionName: string): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(this.getTemplate());
    }

    /**
     * @returns {string}
     */
    protected getTemplate (): string {
        const domainsString: string = this.options.domainLock.join(';');
        const [hiddenDomainsString, diff]: string[] = this.cryptUtils.hideString(
            domainsString,
            domainsString.length * 3
        );
        const globalVariableTemplate: string = this.options.target !== ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate();

        return format(DomainLockNodeTemplate(), {
            domainLockFunctionName: this.identifierNamesGenerator.generate(),
            diff: diff,
            domains: hiddenDomainsString,
            globalVariableTemplate,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
