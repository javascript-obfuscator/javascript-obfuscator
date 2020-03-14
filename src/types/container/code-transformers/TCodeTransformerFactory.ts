import { ICodeTransformer } from '../../../interfaces/code-transformers/ICodeTransformer';

import { CodeTransformer } from '../../../enums/code-transformers/CodeTransformer';

export type TCodeTransformerFactory = (codeTransformerName: CodeTransformer) => ICodeTransformer;
