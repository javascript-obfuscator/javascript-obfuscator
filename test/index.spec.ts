import 'reflect-metadata';

require('source-map-support').install();

/**
 * Unit tests
 */
import './unit-tests/analyzers/stack-trace-analyzer/StackTraceAnalyzer.spec';
import './unit-tests/cli/sanitizers/ArraySanitizer.spec';
import './unit-tests/cli/sanitizers/BooleanSanitizer.spec';
import './unit-tests/cli/sanitizers/IdentifierNamesGeneratorSanitizer.spec';
import './unit-tests/cli/sanitizers/ObfuscationTargetSanitizer.spec';
import './unit-tests/cli/sanitizers/SourceMapModeSanitizer.spec';
import './unit-tests/cli/sanitizers/StringArrayEncodingSanitizer.spec';
import './unit-tests/cli/utils/CLIUtils.spec';
import './unit-tests/cli/utils/SourceCodeReader.spec';
import './unit-tests/decorators/initializable/Initializable.spec';
import './unit-tests/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.spec';
import './unit-tests/generators/identifier-names-generators/MangledlIdentifierNamesGenerator.spec';
import './unit-tests/javascript-obfuscator/EspreeFacade.spec';
import './unit-tests/javascript-obfuscator/JavaScriptObfuscator.spec';
import './unit-tests/logger/Logger.spec';
import './unit-tests/node/node-appender/NodeAppender.spec';
import './unit-tests/node/node-guards/NodeGuards.spec';
import './unit-tests/node/node-metadata/NodeMetadata.spec';
import './unit-tests/node/node-lexical-scope-utils/NodeLexicalScopeUtils.spec';
import './unit-tests/node/node-statement-utils/NodeStatementUtils.spec';
import './unit-tests/node/node-utils/NodeUtils.spec';
import './unit-tests/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.spec';
import './unit-tests/options/ValidationErrorsFormatter.spec';
import './unit-tests/source-code/ObfuscatedCode.spec';
import './unit-tests/storages/ArrayStorage.spec';
import './unit-tests/storages/MapStorage.spec';
import './unit-tests/utils/ArrayUtils.spec';
import './unit-tests/utils/CryptUtils.spec';
import './unit-tests/utils/EscapeSequenceEncoder.spec';
import './unit-tests/utils/NumberUtils.spec';
import './unit-tests/utils/Utils.spec';

/**
 * Functional tests
 */
import './functional-tests/analyzers/stack-trace-analyzer/StackTraceAnalyzer.spec';
import './functional-tests/cli/JavaScriptObfuscatorCLI.spec';
import './functional-tests/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.spec';
import './functional-tests/custom-nodes/domain-lock-nodes/DomainLockNode.spec';
import './functional-tests/custom-nodes/string-array-nodes/StringArrayCallsWrapper.spec';
import './functional-tests/custom-nodes/string-array-nodes/StringArrayRotateFunctionNode.spec';
import './functional-tests/custom-nodes/string-array-nodes/StringArrayNode.spec';
import './functional-tests/javascript-obfuscator/JavaScriptObfuscator.spec';
import './functional-tests/node-transformers/control-flow-transformers/block-statement-control-flow-transformer/BlockStatementControlFlowTransformer.spec';
import './functional-tests/node-transformers/control-flow-transformers/function-control-flow-transformer/FunctionControlFlowTransformer.spec';
import './functional-tests/node-transformers/control-flow-transformers/control-flow-replacers/binary-expression-control-flow-replacer/BinaryExpressionControlFlowReplacer.spec';
import './functional-tests/node-transformers/control-flow-transformers/control-flow-replacers/call-expression-control-flow-replacer/CallExpressionControlFlowReplacer.spec';
import './functional-tests/node-transformers/control-flow-transformers/control-flow-replacers/logical-expression-control-flow-replacer/LogicalExpressionControlFlowReplacer.spec';
import './functional-tests/node-transformers/control-flow-transformers/control-flow-replacers/string-litertal-control-flow-replacer/StringLiteralControlFlowReplacer.spec';
import './functional-tests/node-transformers/converting-transformers/member-expression-transformer/MemberExpressionTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/method-definition-transformer/MethodDefinitionTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/object-expression-keys-transformer/ObjectExpressionKeysTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/object-expression-transformer/ObjectExpressionTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/template-literal-transformer/TemplateLiteralTransformer.spec';
import './functional-tests/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/catch-clause-transformer/CatchClauseTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/class-declaration-transformer/ClassDeclarationTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/function-declaration-transformer/FunctionDeclarationTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/function-transformer/FunctionTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/impot-declaration-transformer/ImportDeclarationTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/labeled-statement-transformer/LabeledStatementTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/literal-transformer/LiteralTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/variable-declaration-transformer/VariableDeclarationTransformer.spec';
import './functional-tests/node-transformers/preparing-transformers/eval-call-expression-transformer/EvalCallExpressionTransformer.spec';
import './functional-tests/node-transformers/preparing-transformers/comments-transformer/CommentsTransformer.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/black-list-obfuscating-guard/BlackListObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/conditional-comment-obfuscating-guard/ConditionalCommentObfuscatingGuard.spec';
import './functional-tests/options/OptionsNormalizer.spec';
import './functional-tests/templates/debug-protection-nodes/DebugProtectionFunctionCallTemplate.spec';
import './functional-tests/templates/domain-lock-nodes/DomainLockNodeTemplate.spec';
import './functional-tests/templates/GlobalVariableNoEvalTemplate.spec';
import './functional-tests/templates/string-array-nodes/StringArrayCallsWrapperNodeTemplate.spec';

/**
 * Performance tests
 */
import './performance-tests/JavaScriptObfuscatorPerformance.spec';

/**
 * Runtime tests
 */
import './runtime-tests/JavaScriptObfuscatorRuntime.spec';
