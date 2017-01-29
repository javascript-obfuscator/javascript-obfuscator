import { ICalleeDataExtractor } from '../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';

import { CalleeDataExtractors } from '../../enums/container/CalleeDataExtractors';

export type TCalleeDataExtractorFactory = (calleeDataExtractorName: CalleeDataExtractors) => ICalleeDataExtractor;
