import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICryptUtils } from '../../interfaces/utils/ICryptUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';

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
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {ICryptUtils} cryptUtils
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.ICryptUtils) cryptUtils: ICryptUtils
    ) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);

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

        return this.customNodeFormatter.formatTemplate(DomainLockNodeTemplate(), {
            domainLockFunctionName: this.identifierNamesGenerator.generate(),
            diff: diff,
            domains: hiddenDomainsString,
            globalVariableTemplate,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
