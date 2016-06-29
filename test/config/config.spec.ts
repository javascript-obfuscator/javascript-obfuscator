import { BabelPolyfill } from '../polyfills/BabelPolyfill';

before(() => {
    BabelPolyfill.append();
});
