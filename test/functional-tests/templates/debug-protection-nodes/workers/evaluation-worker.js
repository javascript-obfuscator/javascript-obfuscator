const expose = require('threads/worker').expose;

expose({
    evaluate: (obfuscatedCode) => {
        return eval(obfuscatedCode);
    }
});