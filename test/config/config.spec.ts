import 'mocha';

import { BabelPolyfill } from '../polyfills/BabelPolyfill';

require('source-map-support').install();

before(() => {
    BabelPolyfill.append();
});
