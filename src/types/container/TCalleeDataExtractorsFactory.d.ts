import { ICalleeDataExtractor } from '../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';

import { CalleeDataExtractors } from '../../enums/container/CalleeDataExtractors';

export type TCalleeDataExtractorsFactory = (calleeDataExtractorName: CalleeDataExtractors) => ICalleeDataExtractor;
