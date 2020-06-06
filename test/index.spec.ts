import 'reflect-metadata';

require('source-map-support').install();

/**
 * Unit tests
 */
import './unit-tests/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.spec';
import './unit-tests/analyzers/prevailing-kind-of-variables-analyzer/PrevailingKindOfVariablesAnalyzer.spec';
import './unit-tests/analyzers/scope-analyzer/ScopeAnalyzer.spec';
import './unit-tests/analyzers/string-array-storage-analyzer/StringArrayStorageAnalyzer.spec';
import './unit-tests/cli/sanitizers/ArraySanitizer.spec';
import './unit-tests/cli/sanitizers/BooleanSanitizer.spec';
import './unit-tests/cli/sanitizers/IdentifierNamesGeneratorSanitizer.spec';
import './unit-tests/cli/sanitizers/ObfuscationTargetSanitizer.spec';
import './unit-tests/cli/sanitizers/SourceMapModeSanitizer.spec';
import './unit-tests/cli/sanitizers/StringArrayEncodingSanitizer.spec';
import './unit-tests/cli/utils/CLIUtils.spec';
import './unit-tests/cli/utils/ObfuscatedCodeWriter.spec';
import './unit-tests/cli/utils/SourceCodeReader.spec';
import './unit-tests/decorators/initializable/Initializable.spec';
import './unit-tests/generators/identifier-names-generators/DictionarylIdentifierNamesGenerator.spec';
import './unit-tests/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.spec';
import './unit-tests/generators/identifier-names-generators/MangledlIdentifierNamesGenerator.spec';
import './unit-tests/javascript-obfuscator/ASTParserFacade.spec';
import './unit-tests/javascript-obfuscator/JavaScriptObfuscator.spec';
import './unit-tests/logger/Logger.spec';
import './unit-tests/node/node-appender/NodeAppender.spec';
import './unit-tests/node/node-guards/NodeGuards.spec';
import './unit-tests/node/node-metadata/NodeMetadata.spec';
import './unit-tests/node/node-lexical-scope-utils/NodeLexicalScopeUtils.spec';
import './unit-tests/node/node-literal-utils/NodeLiteralUtils.spec';
import './unit-tests/node/node-statement-utils/NodeStatementUtils.spec';
import './unit-tests/node/node-utils/NodeUtils.spec';
import './unit-tests/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.spec';
import './unit-tests/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer.spec';
import './unit-tests/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer.spec';
import './unit-tests/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer.spec';
import './unit-tests/options/ValidationErrorsFormatter.spec';
import './unit-tests/source-code/ObfuscatedCode.spec';
import './unit-tests/storages/ArrayStorage.spec';
import './unit-tests/storages/MapStorage.spec';
import './unit-tests/storages/string-array/StringArrayStorage.spec';
import './unit-tests/utils/ArrayUtils.spec';
import './unit-tests/utils/CryptUtils.spec';
import './unit-tests/utils/EscapeSequenceEncoder.spec';
import './unit-tests/utils/LevelledTopologicalSorter.spec';
import './unit-tests/utils/NumberUtils.spec';
import './unit-tests/utils/Utils.spec';

/**
 * Functional tests
 */
import './functional-tests/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.spec';
import './functional-tests/cli/JavaScriptObfuscatorCLI.spec';
import './functional-tests/code-transformers/preparing-transformers/hashbang-operator-transformer/HashbangOperatorTransformer.spec';
import './functional-tests/custom-code-helpers/console-output/ConsoleOutputDisableExpressionCodeHelper.spec';
import './functional-tests/custom-code-helpers/common/templates/GlobalVariableNoEvalTemplate.spec';
import './functional-tests/custom-code-helpers/debug-protection/templates/DebugProtectionFunctionCallTemplate.spec';
import './functional-tests/custom-code-helpers/domain-lock/DomainLockCodeHelper.spec';
import './functional-tests/custom-code-helpers/domain-lock/templates/DomainLockNodeTemplate.spec';
import './functional-tests/custom-code-helpers/self-defending/SelfDefendingCodeHelper.spec';
import './functional-tests/custom-code-helpers/self-defending/templates/SelfDefendingTemplate.spec';
import './functional-tests/custom-code-helpers/self-defending/templates/SelfDefendingNoEvalTemplate.spec';
import './functional-tests/custom-code-helpers/string-array/StringArrayCallsWrapperCodeHelper.spec';
import './functional-tests/custom-code-helpers/string-array/StringArrayRotateFunctionCodeHelper.spec';
import './functional-tests/custom-code-helpers/string-array/StringArrayCodeHelper.spec';
import './functional-tests/custom-code-helpers/string-array/templates/string-array-template/StringArrayTemplate.spec';
import './functional-tests/custom-code-helpers/string-array/templates/string-array-calls-wrapper-node-template/StringArrayCallsWrapperNodeTemplate.spec';
import './functional-tests/custom-code-helpers/string-array/templates/string-array-rotate-function-template/StringArrayRotateFunctionTemplate.spec';
import './functional-tests/generators/identifier-names-generators/dictionary-identifier-names-generator/DictionaryIdentifierNamesGenerator.spec';
import './functional-tests/generators/identifier-names-generators/mangled-identifier-names-generator/MangledIdentifierNamesGenerator.spec';
import './functional-tests/issues/issue321.spec';
import './functional-tests/issues/issue355.spec';
import './functional-tests/issues/issue419.spec';
import './functional-tests/issues/issue424.spec';
import './functional-tests/issues/issue437.spec';
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
import './functional-tests/node-transformers/converting-transformers/split-string-transformer/SplitStringTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/template-literal-transformer/TemplateLiteralTransformer.spec';
import './functional-tests/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.spec';
import './functional-tests/node-transformers/mangle-properties-transformers/mangle-properties-transformer/ManglePropertiesTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/labeled-statement-transformer/LabeledStatementTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/literal-transformer/LiteralTransformer.spec';
import './functional-tests/node-transformers/obfuscating-transformers/scope-identifiers-transformer/catch-clause/CatchClause.spec';
import './functional-tests/node-transformers/obfuscating-transformers/scope-identifiers-transformer/class-declaration/ClassDeclaration.spec';
import './functional-tests/node-transformers/obfuscating-transformers/scope-identifiers-transformer/class-expression/ClassExpression.spec';
import './functional-tests/node-transformers/obfuscating-transformers/scope-identifiers-transformer/function-declaration/FunctionDeclaration.spec';
import './functional-tests/node-transformers/obfuscating-transformers/scope-identifiers-transformer/function/Function.spec';
import './functional-tests/node-transformers/obfuscating-transformers/scope-identifiers-transformer/import-declaration/ImportDeclaration.spec';
import './functional-tests/node-transformers/obfuscating-transformers/scope-identifiers-transformer/variable-declaration/VariableDeclaration.spec';
import './functional-tests/node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer.spec';
import './functional-tests/node-transformers/preparing-transformers/eval-call-expression-transformer/EvalCallExpressionTransformer.spec';
import './functional-tests/node-transformers/initializing-transformers/comments-transformer/CommentsTransformer.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/black-list-obfuscating-guard/BlackListObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/conditional-comment-obfuscating-guard/ConditionalCommentObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/reserved-string-obfuscating-guard/ReservedStringObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/variable-preserve-transformer/VariablePreserveTransformer.spec';
import './functional-tests/options/OptionsNormalizer.spec';
import './functional-tests/options/domain-lock/Validation.spec';
import './functional-tests/storages/string-array-storage/StringArrayStorage.spec';

/**
 * Performance tests
 */
import './performance-tests/JavaScriptObfuscatorPerformance.spec';

/**
 * Runtime tests
 */
import './runtime-tests/JavaScriptObfuscatorRuntime.spec';
