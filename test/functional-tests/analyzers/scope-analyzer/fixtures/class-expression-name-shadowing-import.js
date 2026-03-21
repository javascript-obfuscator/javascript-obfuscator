import { i as e } from './runtime.js';

function factory() {
    return 'factory-result';
}

var P = class e {
    static instance;

    static getInstance() {
        return ((e.instance ||= new e()), e.instance);
    }
};

var x = e(factory(), 1);

export { P, x };
