import { BabelPolyfill } from './polyfills/BabelPolyfill';

require('source-map-support').install();

BabelPolyfill.append();

/**
 * Unit tests
 */
import './unit-tests/node/NodeAppender.spec';
import './unit-tests/node/NodeUtils.spec';
import './unit-tests/ObfuscationResult.spec';
import './unit-tests/OptionsNormalizer.spec';
import './unit-tests/SourceMapCorrector.spec';
import './unit-tests/Utils.spec';
import './unit-tests/cli/CLIUtils.spec';
import './unit-tests/node-obfuscators/CatchClauseObfuscator.spec';
import './unit-tests/node-obfuscators/FunctionDeclarationObfuscator.spec';
import './unit-tests/node-obfuscators/FunctionObfuscator.spec';
import './unit-tests/stack-trace-analyzer/StackTraceAnalyzer.spec';

/**
 * Functional tests
 */
import './functional-tests/JavaScriptObfuscator.spec';
import './functional-tests/JavaScriptObfuscatorCLI.spec';
import './functional-tests/JavaScriptObfuscatorInternal.spec';
import './functional-tests/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.spec';
import './functional-tests/custom-nodes/domain-lock-nodes/DomainLockNode.spec';
import './functional-tests/custom-nodes/strings-array-nodes/StringsArrayCallsWrapper.spec';
import './functional-tests/custom-nodes/strings-array-nodes/StringsArrayRotateFunctionNode.spec';
import './functional-tests/custom-nodes/strings-array-nodes/StringsArrayNode.spec';
import './functional-tests/node-obfuscators/FunctionObfuscator.spec';
import './functional-tests/node-obfuscators/LiteralObfuscator.spec';
import './functional-tests/node-obfuscators/MemberExpressionObfuscator.spec';
import './functional-tests/node-obfuscators/MethodDefinitionObfuscator.spec';
import './functional-tests/node-obfuscators/ObjectExpressionObfuscator.spec';
import './functional-tests/node-obfuscators/VariableDeclarationObfuscator.spec';
import './functional-tests/stack-trace-analyzer/StackTraceAnalyzer.spec';
import './functional-tests/templates/custom-nodes/domain-lock-nodes/DomainLockNodeTemplate.spec';
import './functional-tests/templates/custom-nodes/strings-array-nodes/StringsArrayCallsWrapperNodeTemplate.spec';

/**
 * Performance tests
 */
import './performance-tests/JavaScriptObfuscatorPerformance.spec';
