import { ICalleeDataExtractor } from '../../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';

import { CalleeDataExtractors } from '../../../enums/container/stack-trace-analyzer/CalleeDataExtractors';

export type TCalleeDataExtractorFactory = (calleeDataExtractorName: CalleeDataExtractors) => ICalleeDataExtractor;
