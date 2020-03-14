import { injectable } from 'inversify';

import { ICodeTransformer } from '../interfaces/code-transformers/ICodeTransformer';

import { CodeTransformer } from '../enums/code-transformers/CodeTransformer';

import { AbstractTransformerNamesGroupsBuilder } from '../utils/AbstractTransformerNamesGroupsBuilder';

@injectable()
export class CodeTransformerNamesGroupsBuilder extends AbstractTransformerNamesGroupsBuilder<
    CodeTransformer,
    ICodeTransformer
> {}
