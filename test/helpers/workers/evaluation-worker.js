const expose = require('threads/worker').expose;

expose({
    evaluate: (code) => {
        return eval(code);
    }
});