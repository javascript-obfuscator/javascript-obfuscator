import { ICalleeDataExtractor } from '../../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';

import { CalleeDataExtractor } from '../../../enums/container/stack-trace-analyzer/CalleeDataExtractor';

export type TCalleeDataExtractorFactory = (calleeDataExtractorName: CalleeDataExtractor) => ICalleeDataExtractor;
