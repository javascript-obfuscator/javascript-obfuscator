import 'reflect-metadata';

/**
 * Unit tests
 */
import './unit-tests/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.spec';
import './unit-tests/analyzers/number-numerical-expression-analyzer/NumberNumericalExpressionAnalyzer.spec';
import './unit-tests/analyzers/prevailing-kind-of-variables-analyzer/PrevailingKindOfVariablesAnalyzer.spec';
import './unit-tests/analyzers/scope-analyzer/ScopeAnalyzer.spec';
import './unit-tests/analyzers/string-array-storage-analyzer/StringArrayStorageAnalyzer.spec';
import './unit-tests/cli/sanitizers/ArraySanitizer.spec';
import './unit-tests/cli/sanitizers/BooleanSanitizer.spec';
import './unit-tests/cli/utils/CLIUtils.spec';
import './unit-tests/cli/utils/ObfuscatedCodeWriter.spec';
import './unit-tests/cli/utils/SourceCodeReader.spec';
import './unit-tests/decorators/initializable/Initializable.spec';
import './unit-tests/generators/identifier-names-generators/DictionarylIdentifierNamesGenerator.spec';
import './unit-tests/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.spec';
import './unit-tests/generators/identifier-names-generators/MangledShuffledlIdentifierNamesGenerator.spec';
import './unit-tests/generators/identifier-names-generators/MangledlIdentifierNamesGenerator.spec';
import './unit-tests/javascript-obfuscator/ASTParserFacade.spec';
import './unit-tests/javascript-obfuscator/JavaScriptObfuscator.spec';
import './unit-tests/logger/Logger.spec';
import './unit-tests/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.spec';
import './unit-tests/node/node-appender/NodeAppender.spec';
import './unit-tests/node/node-guards/NodeGuards.spec';
import './unit-tests/node/node-lexical-scope-utils/NodeLexicalScopeUtils.spec';
import './unit-tests/node/node-literal-utils/NodeLiteralUtils.spec';
import './unit-tests/node/node-metadata/NodeMetadata.spec';
import './unit-tests/node/node-statement-utils/NodeStatementUtils.spec';
import './unit-tests/node/node-utils/NodeUtils.spec';
import './unit-tests/node/numerical-expression-data-to-node-converter/NumericalExpressionDataToNodeConverter.spec';
import './unit-tests/options/Options.spec';
import './unit-tests/options/ValidationErrorsFormatter.spec';
import './unit-tests/source-code/ObfuscationResult.spec';
import './unit-tests/source-code/SourceCode.spec';
import './unit-tests/storages/ArrayStorage.spec';
import './unit-tests/storages/MapStorage.spec';
import './unit-tests/storages/identifier-names-cache/IdentifierNamesCacheStorage.spec';
import './unit-tests/storages/string-array-transformers/literal-nodes-cache/LiteralNodesCacheStorage.spec';
import './unit-tests/storages/string-array-transformers/string-array/StringArrayStorage.spec';
import './unit-tests/storages/string-array-transformers/visited-lexical-scope-nodes-stack/VisitedLexicalScopeNodesStackStorage.spec';
import './unit-tests/utils/ArrayUtils.spec';
import './unit-tests/utils/CryptUtils.spec';
import './unit-tests/utils/CryptUtilsStringArray.spec';
import './unit-tests/utils/EscapeSequenceEncoder.spec';
import './unit-tests/utils/LevelledTopologicalSorter.spec';
import './unit-tests/utils/NumberUtils.spec';
import './unit-tests/utils/RandomGenerator.spec';
import './unit-tests/utils/StringUtils.spec';
import './unit-tests/utils/Utils.spec';

/**
 * Functional tests
 */
import './functional-tests/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.spec';
import './functional-tests/analyzers/scope-analyzer/ScopeAnalyzer.spec';
import './functional-tests/cli/JavaScriptObfuscatorCLI.spec';
import './functional-tests/code-transformers/preparing-transformers/hashbang-operator-transformer/HashbangOperatorTransformer.spec';
import './functional-tests/custom-code-helpers/common/templates/GlobalVariableNoEvalTemplate.spec';
import './functional-tests/custom-code-helpers/console-output/ConsoleOutputDisableExpressionCodeHelper.spec';
import './functional-tests/custom-code-helpers/console-output/templates/ConsoleOutputDisableTemplate.spec';
import './functional-tests/custom-code-helpers/debug-protection/templates/DebugProtectionFunctionCallTemplate.spec';
import './functional-tests/custom-code-helpers/domain-lock/DomainLockCodeHelper.spec';
import './functional-tests/custom-code-helpers/domain-lock/templates/DomainLockNodeTemplate.spec';
import './functional-tests/custom-code-helpers/self-defending/SelfDefendingCodeHelper.spec';
import './functional-tests/custom-code-helpers/self-defending/templates/SelfDefendingNoEvalTemplate.spec';
import './functional-tests/custom-code-helpers/self-defending/templates/SelfDefendingTemplate.spec';
import './functional-tests/custom-code-helpers/string-array/StringArrayCallsWrapperCodeHelper.spec';
import './functional-tests/custom-code-helpers/string-array/StringArrayCodeHelper.spec';
import './functional-tests/custom-code-helpers/string-array/StringArrayRotateFunctionCodeHelper.spec';
import './functional-tests/custom-code-helpers/string-array/group/StringArrayCodeHelperGroup.spec';
import './functional-tests/custom-code-helpers/string-array/templates/string-array-calls-wrapper-node-template/StringArrayCallsWrapperTemplate.spec';
import './functional-tests/custom-code-helpers/string-array/templates/string-array-rotate-function-template/StringArrayRotateFunctionTemplate.spec';
import './functional-tests/custom-code-helpers/string-array/templates/string-array-template/StringArrayTemplate.spec';
import './functional-tests/generators/identifier-names-generators/dictionary-identifier-names-generator/DictionaryIdentifierNamesGenerator.spec';
import './functional-tests/generators/identifier-names-generators/mangled-identifier-names-generator/MangledIdentifierNamesGenerator.spec';
import './functional-tests/generators/identifier-names-generators/mangled-shuffled-identifier-names-generator/MangledShuffledIdentifierNamesGenerator.spec';
import './functional-tests/issues/issue321.spec';
import './functional-tests/issues/issue355.spec';
import './functional-tests/issues/issue419.spec';
import './functional-tests/issues/issue424.spec';
import './functional-tests/issues/issue437.spec';
import './functional-tests/javascript-obfuscator/JavaScriptObfuscator.spec';
import './functional-tests/node-transformers/control-flow-transformers/block-statement-control-flow-transformer/BlockStatementControlFlowTransformer.spec';
import './functional-tests/node-transformers/control-flow-transformers/control-flow-replacers/binary-expression-control-flow-replacer/BinaryExpressionControlFlowReplacer.spec';
import './functional-tests/node-transformers/control-flow-transformers/control-flow-replacers/call-expression-control-flow-replacer/CallExpressionControlFlowReplacer.spec';
import './functional-tests/node-transformers/control-flow-transformers/control-flow-replacers/logical-expression-control-flow-replacer/LogicalExpressionControlFlowReplacer.spec';
import './functional-tests/node-transformers/control-flow-transformers/control-flow-replacers/string-litertal-control-flow-replacer/StringLiteralControlFlowReplacer.spec';
import './functional-tests/node-transformers/control-flow-transformers/function-control-flow-transformer/FunctionControlFlowTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/boolean-literal-transformer/BooleanLiteralTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/export-specifier-transformer/ExportSpecifierTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/member-expression-transformer/MemberExpressionTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/method-definition-transformer/MethodDefinitionTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/number-literal-transformer/NumberLiteralTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/numbers-to-numerical-expressions-transformer/NumbersToNumericalExpressionsTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/object-expression-keys-transformer/ObjectExpressionKeysTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/object-expression-transformer/ObjectExpressionTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/object-pattern-properties-transformer/ObjectPatternPropertiesTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/split-string-transformer/SplitStringTransformer.spec';
import './functional-tests/node-transformers/converting-transformers/template-literal-transformer/TemplateLiteralTransformer.spec';
import './functional-tests/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.spec';
import './functional-tests/node-transformers/finalizing-transformers/directive-placement-transformer/DirectivePlacementTransformer.spec';
import './functional-tests/node-transformers/finalizing-transformers/escape-sequence-transformer/EscapeSequenceTransformer.spec';
import './functional-tests/node-transformers/initializing-transformers/comments-transformer/CommentsTransformer.spec';
import './functional-tests/node-transformers/preparing-transformers/eval-call-expression-transformer/EvalCallExpressionTransformer.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/black-list-obfuscating-guard/BlackListObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/conditional-comment-obfuscating-guard/ConditionalCommentObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/force-transform-string-obfuscating-guard/ForceTransformStringObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/ignored-require-import-obfuscating-guard/IgnoredRequireImportObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/obfuscating-guards/reserved-string-obfuscating-guard/ReservedStringObfuscatingGuard.spec';
import './functional-tests/node-transformers/preparing-transformers/variable-preserve-transformer/VariablePreserveTransformer.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/identifier-replacer/IdentifierReplacer.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/labeled-statement-transformer/LabeledStatementTransformer.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-identifiers-transformer/catch-clause/CatchClause.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-identifiers-transformer/class-declaration/ClassDeclaration.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-identifiers-transformer/class-expression/ClassExpression.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-identifiers-transformer/function-declaration/FunctionDeclaration.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-identifiers-transformer/function/Function.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-identifiers-transformer/import-declaration/ImportDeclaration.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-identifiers-transformer/variable-declaration/VariableDeclaration.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-through-identifiers-transformer/class-declaration/ClassDeclaration.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-through-identifiers-transformer/function-declaration/FunctionDeclaration.spec';
import './functional-tests/node-transformers/rename-identifiers-transformers/scope-through-identifiers-transformer/variable-declaration/VariableDeclaration.spec';
import './functional-tests/node-transformers/rename-properties-transformers/rename-properties-transformer/RenamePropertiesTransformer.spec';
import './functional-tests/node-transformers/simplifying-transformers/block-statement-simplify-transformer/BlockStatementSimplifyTransformer.spec';
import './functional-tests/node-transformers/simplifying-transformers/expression-statements-merge-transformer/ExpressionStatementsMergeTransformer.spec';
import './functional-tests/node-transformers/simplifying-transformers/if-statement-simplify-transformer/IfStatementSimplifyTransformer.spec';
import './functional-tests/node-transformers/simplifying-transformers/variable-declarations-merge-transformer/VariableDeclarationsMergeTransformer.spec';
import './functional-tests/node-transformers/string-array-transformers/string-array-rotate-function-transformer/StringArrayRotateFunctionTransformer.spec';
import './functional-tests/node-transformers/string-array-transformers/string-array-scope-calls-wrapper-transformer/StringArrayScopeCallsWrapperTransformer.spec';
import './functional-tests/node-transformers/string-array-transformers/string-array-transformer/StringArrayTransformer.spec';
import './functional-tests/options/OptionsNormalizer.spec';
import './functional-tests/options/domain-lock/Validation.spec';
import './functional-tests/options/identifier-names-cache/Validation.spec';
import './functional-tests/storages/string-array-transformers/string-array-storage/StringArrayStorage.spec';

/**
 * Performance tests
 */
import './performance-tests/JavaScriptObfuscatorPerformance.spec';

/**
 * Runtime tests
 */
import './runtime-tests/JavaScriptObfuscatorRuntime.spec';
