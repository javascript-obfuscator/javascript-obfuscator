import { IPropertiesExtractor } from '../../../interfaces/node-transformers/converting-transformers/properties-extractors/IPropertiesExtractor';

import { PropertiesExtractor } from '../../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor';

export type TPropertiesExtractorFactory = (propertiesExtractorName: PropertiesExtractor) => IPropertiesExtractor;
