import { BabelPolyfill } from './polyfills/BabelPolyfill';

require('source-map-support').install();

BabelPolyfill.append();

/**
 * Unit tests
 */
import './unit-tests/NodeUtils.spec';
import './unit-tests/ObfuscationResult.spec';
import './unit-tests/OptionsNormalizer.spec';
import './unit-tests/SourceMapCorrector.spec';
import './unit-tests/Utils.spec';
import './unit-tests/cli/CLIUtils.spec';
import './unit-tests/node-obfuscators/CatchClauseObfuscator.spec';
import './unit-tests/node-obfuscators/FunctionDeclarationObfuscator.spec';
import './unit-tests/node-obfuscators/FunctionObfuscator.spec';

/**
 * Functional tests
 */
import './functional-tests/JavaScriptObfuscator.spec';
import './functional-tests/JavaScriptObfuscatorCLI.spec';
import './functional-tests/JavaScriptObfuscatorInternal.spec';
import './functional-tests/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.spec';
import './functional-tests/custom-nodes/unicode-array-nodes/UnicodeArrayCallsWrapper.spec';
import './functional-tests/custom-nodes/unicode-array-nodes/UnicodeArrayDecodeNode.spec';
import './functional-tests/custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionNode.spec';
import './functional-tests/custom-nodes/unicode-array-nodes/UnicodeArrayNode.spec';
import './functional-tests/node-obfuscators/LiteralObfuscator.spec';
import './functional-tests/node-obfuscators/MemberExpressionObfuscator.spec';
import './functional-tests/node-obfuscators/MethodDefinitionObfuscator.spec';
import './functional-tests/node-obfuscators/ObjectExpressionObfuscator.spec';
import './functional-tests/node-obfuscators/VariableDeclarationObfuscator.spec';
