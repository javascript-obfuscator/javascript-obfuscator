import { ICalleeDataExtractor } from '../../../interfaces/analyzers/stack-trace-analyzer/ICalleeDataExtractor';

import { CalleeDataExtractor } from '../../../enums/analyzers/stack-trace-analyzer/CalleeDataExtractor';

export type TCalleeDataExtractorFactory = (calleeDataExtractorName: CalleeDataExtractor) => ICalleeDataExtractor;
