#!/usr/bin/env node

var commands = require('commander'),
    fs = require('fs'),
    path = require('path'),
    JavaScriptObfuscator = require('../dist/index'),
    data = '',
    defaultOptions = {
        compact: true,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: true,
        encodeUnicodeLiterals: false,
        reservedNames: [],
        rotateUnicodeArray: true,
        selfDefending: true,
        unicodeArray: true,
        unicodeArrayThreshold: 0.8,
        wrapUnicodeArrayCalls: true
    };

configureProcess();
configureCommands();

commands.parse(process.argv);

if (!isDataExist()) {
    commands.outputHelp();

    return 0;
}

function buildOptions () {
    var options = {},
        availableOptions = Object.keys(defaultOptions);

    for (var option in commands) {
        if (availableOptions.indexOf(option) === -1) {
            continue;
        }

        options[option] = commands[option];
    }

    return Object.assign({}, defaultOptions, options);
}

function configureCommands () {
    commands
        .version(getBuildVersion(), '-v, --version')
        .usage('[options] STDIN STDOUT')
        .option('--compact <boolean>', 'Disable one line output code compacting', parseBoolean)
        .option('--debugProtection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', parseBoolean)
        .option('--debugProtectionInterval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', parseBoolean)
        .option('--disableConsoleOutput <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', parseBoolean)
        .option('--encodeUnicodeLiterals <boolean>', 'All literals in Unicode array become encoded in Base64 (this option can slightly slow down your code speed)', parseBoolean)
        .option('--reservedNames <list>', 'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)', (val) => val.split(','))
        .option('--rotateUnicodeArray <boolean>', 'Disable rotation of unicode array values during obfuscation', parseBoolean)
        .option('--selfDefending <boolean>', 'Disables self-defending for obfuscated code', parseBoolean)
        .option('--unicodeArray <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', parseBoolean)
        .option('--unicodeArrayThreshold <number>', 'The probability that the literal string will be inserted into unicodeArray (Default: 0.8, Min: 0, Max: 1)', parseFloat)
        .option('--wrapUnicodeArrayCalls <boolean>', 'Disables usage of special access function instead of direct array call', parseBoolean)
    ;

    commands.on('--help', function () {
        var isWindows = process.platform == 'win32';

        console.log('  Examples:\n');
        console.log('    %> javascript-obfuscator < in.js > out.js');

        if (isWindows) {
            console.log('    %> type in1.js in2.js | javascript-obfuscator > out.js');
        } else {
            console.log('    %> cat in1.js in2.js | javascript-obfuscator > out.js');
        }

        console.log('');

        process.exit();
    });
}

function configureProcess () {
    process.stdin.setEncoding('utf-8');

    process.stdin.on('readable', function () {
        var chunk;

        while (chunk = process.stdin.read()) {
            data += chunk;
        }
    });

    process.stdin.on('end', function () {
        processData();
    });
}

function getBuildVersion () {
    var packageConfig = fs.readFileSync(
        path.join(
            path.dirname(
                fs.realpathSync(process.argv[1])
            ),
            '../package.json'
        )
    );

    return JSON.parse(packageConfig).version;
}

function isDataExist () {
    return !process.env.__DIRECT__ && !process.stdin.isTTY;
}

function parseBoolean (value) {
    return value === 'true' || value === '1';
}

function processData() {
    process.stdout.write(
        JavaScriptObfuscator.obfuscate(data, buildOptions())
    );
}
