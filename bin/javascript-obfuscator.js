#!/usr/bin/env node

var commands = require('commander'),
    fs = require('fs'),
    path = require('path'),
    JavaScriptObfuscator = require('../dist/index'),
    packageConfig = fs.readFileSync(path.join(path.dirname(fs.realpathSync(process.argv[1])), '../package.json')),
    buildVersion = JSON.parse(packageConfig).version,
    isWindows = process.platform == 'win32';

// Specify commander options to parse command line params correctly
commands
  .version(buildVersion, '-v, --version')
  .usage('[options] STDIN STDOUT')
  .option('--skip-compact', 'Disable one line output code compacting.')
  .option('--debugProtection', 'Disable browser Debug panel (can cause DevTools enabled browser freeze).')
  .option('--debugProtectionInterval', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze).')
  .option('--skip-disableConsoleOutput', 'Allow console.log, console.info, console.error and console.warn messages output into browser console.')
  .option('--encodeUnicodeLiterals', 'All literals in Unicode array become encoded in Base64 (this option can slightly slow down your code speed).')
  .option('--reservedNames <list>', 'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated).', (val) => val.split(','))
  .option('--skip-rotateUnicodeArray', 'Disable rotation of unicode array values during obfuscation.')
  .option('--skip-selfDefending', 'Disables self-defending for obfuscated code.')
  .option('--skip-unicodeArray', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call.')	
  .option('--unicodeArrayThreshold <threshold>', 'The probability that the literal string will be inserted into unicodeArray (Default: 0.8, Min: 0, Max: 1).', parseFloat)	
  .option('--skip-wrapUnicodeArrayCalls', 'Disables usage of special access function instead of direct array call.')
;

commands.on('--help', function () {
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

commands.parse(process.argv);

// If no sensible data passed in just print help and exit
var fromStdin = !process.env.__DIRECT__ && !process.stdin.isTTY;

if (!fromStdin) {
  commands.outputHelp();

  return 0;
}

var encoding = 'utf-8',
    data = '';

process.stdin.setEncoding(encoding);
 
process.stdin.on('readable', function() {
    var chunk;

    while (chunk = process.stdin.read()) {
      data += chunk;
    }
});
 
process.stdin.on('end', function () {
    processData();
});
 
function processData () {
  var options = {
    compact : commands.skipCompact ? false : true,
    debugProtection : commands.debugProtection,
    debugProtectionInterval : commands.debugProtectionInterval,
    disableConsoleOutput : commands.skipDisableConsoleOutput ? false : true,
    encodeUnicodeLiterals: commands.encodeUnicodeLiterals,
    reservedNames: commands.reservedNames ? commands.reservedNames : [],
    rotateUnicodeArray : commands.skipRotateUnicodeArray ? false : true,
    selfDefending: commands.skipSelfDefending ? false : true,
    unicodeArray: commands.skipUnicodeArray ? false : true,
    unicodeArrayThreshold: commands.unicodeArrayThreshold ? commands.unicodeArrayThreshold : 0.8,
    wrapUnicodeArrayCalls: commands.skipWrapUnicodeArrayCalls ? false : true,
  };

  var obfuscatedCode = JavaScriptObfuscator.obfuscate(data, options);

  process.stdout.write(obfuscatedCode);
}
