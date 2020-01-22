import * as ESTree from 'estree';

import { PropertiesExtractorFlag } from '../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractorResult';

export type TPropertiesExtractorResult = ESTree.Node | PropertiesExtractorFlag;
