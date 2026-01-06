# JavaScript Obfuscator - Project Documentation

## Project Overview

**JavaScript Obfuscator** is a powerful, enterprise-grade code obfuscation tool for JavaScript and Node.js applications. It transforms readable JavaScript code into a protected, difficult-to-understand format while maintaining full functionality. The project is widely used for protecting intellectual property and preventing reverse engineering.

- **Version**: 5.0.0
- **Author**: Timofei Kachalov (@sanex3339)
- **License**: BSD-2-Clause
- **Repository**: https://github.com/javascript-obfuscator/javascript-obfuscator
- **Homepage**: https://obfuscator.io/
- **Node Requirement**: >=18.0.0

## Key Features

### Core Obfuscation Techniques

1. **Variable & Function Renaming**: Replaces identifiable names with cryptic hexadecimal or mangled identifiers
2. **String Extraction & Encryption**: Moves string literals to an encoded array with base64/rc4 encryption
3. **Dead Code Injection**: Inserts non-functional code blocks to confuse static analysis
4. **Control Flow Flattening**: Restructures code flow using switch statements to obscure logic
5. **Code Transformations**: Multiple AST-level transformations including:
   - Boolean literal obfuscation
   - Number to expression conversion
   - Object key transformation
   - Template literal transformation
   - Property renaming (safe/unsafe modes)

### Advanced Protection Features

- **Self-Defending Code**: Code that breaks when beautified or modified
- **Debug Protection**: Anti-debugging mechanisms to prevent DevTools usage
- **Domain Lock**: Restricts code execution to specific domains/subdomains
- **Console Output Disabling**: Removes console.* functionality
- **Unicode Escape Sequences**: Additional string obfuscation layer

## Architecture Overview

### Technology Stack

- **Language**: TypeScript 4.9.5
- **Parser**: Acorn 8.8.2 (ES3-ES2020 support)
- **Code Generator**: @javascript-obfuscator/escodegen 2.3.0
- **AST Traversal**: @javascript-obfuscator/estraverse 5.4.0
- **DI Framework**: InversifyJS 6.0.1
- **Testing**: Mocha 10.4.0 + Chai 4.3.7
- **Build System**: Webpack 5.75.0

### Project Structure

```
javascript-obfuscator/
├── src/                              # Source code
│   ├── JavaScriptObfuscator.ts      # Main obfuscator class
│   ├── JavaScriptObfuscatorFacade.ts # Public API facade
│   ├── JavaScriptObfuscatorCLIFacade.ts # CLI interface
│   ├── ASTParserFacade.ts           # AST parsing wrapper
│   │
│   ├── analyzers/                    # Code analysis components
│   │   ├── calls-graph-analyzer/    # Function call graph analysis
│   │   ├── scope-analyzer/          # Variable scope analysis
│   │   ├── string-array-storage-analyzer/ # String array optimization
│   │   ├── number-numerical-expression-analyzer/
│   │   └── prevailing-kind-of-variables-analyzer/
│   │
│   ├── node-transformers/            # AST transformation pipeline
│   │   ├── AbstractNodeTransformer.ts
│   │   ├── NodeTransformersRunner.ts
│   │   ├── converting-transformers/ # Node type conversions
│   │   ├── control-flow-transformers/ # Control flow flattening
│   │   ├── dead-code-injection-transformers/ # Dead code generation
│   │   ├── finalizing-transformers/ # Post-processing transforms
│   │   ├── initializing-transformers/ # Pre-processing transforms
│   │   ├── preparing-transformers/  # Preparation phase
│   │   ├── rename-identifiers-transformers/ # Variable renaming
│   │   ├── rename-properties-transformers/ # Property renaming
│   │   ├── simplifying-transformers/ # Code simplification
│   │   └── string-array-transformers/ # String array handling
│   │
│   ├── code-transformers/            # Code-level (not AST) transformers
│   │   ├── AbstractCodeTransformer.ts
│   │   ├── CodeTransformersRunner.ts
│   │   └── CodeTransformerNamesGroupsBuilder.ts
│   │
│   ├── custom-code-helpers/          # Injectable code helpers
│   │   ├── common/                   # Global variable templates
│   │   ├── console-output/          # Console disabling templates
│   │   ├── debug-protection/        # Anti-debugging templates
│   │   ├── domain-lock/             # Domain restriction templates
│   │   ├── self-defending/          # Self-defense templates
│   │   └── string-array/            # String array wrapper templates
│   │
│   ├── custom-nodes/                 # Custom AST node generators
│   │   ├── control-flow-flattening-nodes/
│   │   ├── dead-code-injection-nodes/
│   │   ├── object-expression-keys-transformer-nodes/
│   │   └── string-array-nodes/
│   │
│   ├── container/                    # Dependency injection
│   │   ├── InversifyContainerFacade.ts
│   │   ├── ServiceIdentifiers.ts
│   │   └── modules/                 # DI module definitions
│   │
│   ├── options/                      # Configuration system
│   │   ├── Options.ts
│   │   ├── OptionsNormalizer.ts
│   │   ├── validators/              # Option validation
│   │   ├── normalizer-rules/        # Option normalization
│   │   └── presets/                 # Obfuscation presets
│   │
│   ├── storages/                     # Data storage components
│   │   ├── string-array-transformers/
│   │   ├── control-flow-transformers/
│   │   ├── custom-code-helpers/
│   │   └── identifier-names-cache/
│   │
│   ├── node/                         # AST node utilities
│   │   ├── NodeGuards.ts            # Type guards
│   │   ├── NodeFactory.ts           # Node creation
│   │   ├── NodeAppender.ts          # Node insertion
│   │   ├── NodeStatementUtils.ts
│   │   └── NodeUtils.ts
│   │
│   ├── generators/                   # Name/value generators
│   │   ├── identifier-names-generators/
│   │   └── string-array-index-nodes-generators/
│   │
│   ├── utils/                        # Utility functions
│   │   ├── RandomGenerator.ts
│   │   ├── ArrayUtils.ts
│   │   ├── CryptUtils.ts
│   │   ├── LevelledTopologicalSorter.ts
│   │   └── Utils.ts
│   │
│   ├── cli/                          # CLI utilities
│   │   ├── sanitizers/              # Input sanitizers
│   │   └── utils/                   # File handling
│   │
│   ├── enums/                        # Enumerations
│   ├── interfaces/                   # TypeScript interfaces
│   ├── types/                        # Type definitions
│   ├── constants/                    # Constants
│   ├── decorators/                   # Decorators
│   └── logger/                       # Logging system
│
├── test/                             # Test suite
│   ├── functional-tests/            # Feature tests
│   ├── unit-tests/                  # Unit tests
│   ├── performance-tests/           # Performance benchmarks
│   └── index.spec.ts
│
├── webpack/                          # Build configurations
│   ├── webpack.node.config.js
│   └── webpack.browser.config.js
│
├── dist/                             # Compiled output
│   ├── index.js                     # Node.js bundle
│   └── index.browser.js             # Browser bundle
│
├── bin/                              # CLI executable
│   └── javascript-obfuscator
│
└── typings/                          # TypeScript declarations
```

## Core Workflow

### Obfuscation Pipeline

The obfuscation process follows a multi-stage pipeline defined in `JavaScriptObfuscator.ts`:

```
1. Code Transformation Stage: PreparingTransformers
   └─> Raw code preprocessing (e.g., hashbang handling)

2. AST Parsing
   └─> Parse source code into ESTree-compliant AST using Acorn

3. Node Transformation Stages (sequential):
   ├─> Initializing
   │   └─> Initial AST setup, parentification, metadata
   ├─> Preparing
   │   └─> Scope analysis, obfuscating guards, identifier collection
   ├─> DeadCodeInjection (optional)
   │   └─> Insert dead code blocks
   ├─> ControlFlowFlattening (optional)
   │   └─> Flatten control flow with switch statements
   ├─> RenameProperties (optional)
   │   └─> Rename object properties
   ├─> Converting
   │   └─> Transform nodes (literals, expressions, etc.)
   ├─> RenameIdentifiers
   │   └─> Rename variables and functions
   ├─> StringArray
   │   └─> Extract strings to array, add wrappers
   ├─> Simplifying (optional)
   │   └─> Simplify and merge statements
   └─> Finalizing
       └─> Final cleanup, directive placement

4. Code Generation
   └─> Generate obfuscated code using escodegen

5. Code Transformation Stage: FinalizingTransformers
   └─> Post-processing on generated code

6. Source Map Generation (optional)
   └─> Create source maps for debugging
```

### Dependency Injection Architecture

The project uses **InversifyJS** for dependency injection, providing:

- **Modularity**: Clean separation of concerns
- **Testability**: Easy mocking and testing
- **Flexibility**: Runtime configuration of transformers
- **Scalability**: Easy addition of new transformers

All components are registered in container modules located in `src/container/modules/`.

## Key Components Deep Dive

### 1. JavaScriptObfuscator (Main Engine)

**Location**: `src/JavaScriptObfuscator.ts`

The core orchestrator that:
- Manages the complete obfuscation pipeline
- Coordinates code and node transformers
- Handles AST parsing and code generation
- Integrates with logger and random generator

**Key Methods**:
- `obfuscate(sourceCode: string): IObfuscationResult` - Main entry point
- `parseCode()` - AST parsing with Acorn
- `transformAstTree()` - Applies transformation stages
- `generateCode()` - Code generation with escodegen

### 2. Node Transformers

**Location**: `src/node-transformers/`

Each transformer implements `INodeTransformer` interface with:
- `getVisitor(stage): IVisitor | null` - Returns visitor for specific stage
- `transformNode(node, parent): Node` - Transforms individual AST node

**Key Transformers**:

- **StringArrayTransformer**: Extracts string literals to centralized array
- **BooleanLiteralTransformer**: Converts true/false to `!![]` and `![]`
- **NumberToNumericalExpressionTransformer**: Converts numbers to expressions
- **BlockStatementControlFlowTransformer**: Implements control flow flattening
- **DeadCodeInjectionTransformer**: Injects dead code blocks
- **RenamePropertiesTransformer**: Renames object properties
- **ScopeIdentifiersTransformer**: Renames variables based on scope

### 3. Analyzers

**Location**: `src/analyzers/`

- **CallsGraphAnalyzer**: Builds function call dependency graph
- **ScopeAnalyzer**: Analyzes variable scopes using eslint-scope
- **StringArrayStorageAnalyzer**: Optimizes string array storage
- **PrevailingKindOfVariablesAnalyzer**: Determines var/let/const usage
- **NumberNumericalExpressionAnalyzer**: Analyzes numeric expressions

### 4. Custom Code Helpers

**Location**: `src/custom-code-helpers/`

Injectable runtime helpers that provide:
- **String Array Decoders**: Base64/RC4 decoding functions
- **Debug Protection**: Anti-debugging wrapper code
- **Domain Lock**: Domain validation code
- **Self-Defending**: Code integrity checks
- **Console Output Disable**: Console method replacements

### 5. Options System

**Location**: `src/options/`

Sophisticated configuration system with:
- **Validation**: Using class-validator decorators
- **Normalization**: Automatic option interdependency handling
- **Presets**: Default, low, medium, and high obfuscation presets
- **Type Safety**: Full TypeScript support

**Key Option Categories**:
- Code output (compact, target)
- String transformations (stringArray*, splitStrings)
- Control flow (controlFlowFlattening, deadCodeInjection)
- Naming (identifierNamesGenerator, renameGlobals, renameProperties)
- Protection (selfDefending, debugProtection, domainLock)
- Advanced (numbersToExpressions, simplify, transformObjectKeys)

## Important Patterns and Conventions

### 1. Visitor Pattern

Transformers use the visitor pattern for AST traversal:

```typescript
interface IVisitor {
    enter?: (node: Node, parent: Node) => Node | VisitorOption;
    leave?: (node: Node, parent: Node) => Node | VisitorOption;
}
```

### 2. Initializable Pattern

Many components implement `IInitializable` for lazy initialization:

```typescript
interface IInitializable {
    initialize(...args: any[]): void;
}
```

Managed via `@Initializable()` decorator.

### 3. Stage-Based Processing

Both code and node transformers operate in stages:

**Code Transformation Stages**:
- PreparingTransformers
- FinalizingTransformers

**Node Transformation Stages**:
- Initializing
- Preparing
- DeadCodeInjection
- ControlFlowFlattening
- RenameProperties
- Converting
- RenameIdentifiers
- StringArray
- Simplifying
- Finalizing

### 4. Factory Pattern

Extensive use of factories for object creation:
- `TObfuscationResultFactory`
- Custom node factories
- Identifier name generators

### 5. Storage Pattern

Centralized storages for shared data:
- String array storage
- Custom code helpers storage
- Identifier names cache storage
- Control flow transformers storage

## CLI Usage

**Location**: `bin/javascript-obfuscator`, `src/JavaScriptObfuscatorCLIFacade.ts`

### Basic Commands

```bash
# Obfuscate single file
javascript-obfuscator input.js --output output.js

# Obfuscate directory
javascript-obfuscator ./src --output ./dist

# Use configuration file
javascript-obfuscator input.js --config config.json

# High obfuscation preset
javascript-obfuscator input.js --options-preset high-obfuscation
```

### CLI Features

- Automatic identifier prefix for multiple files
- Glob pattern exclusions
- Source map support
- Identifier names cache (cross-file consistency)
- Progress logging

## API Usage

### Basic Obfuscation

```javascript
const JavaScriptObfuscator = require('javascript-obfuscator');

const obfuscationResult = JavaScriptObfuscator.obfuscate(
    `
    var foo = 'Hello World';
    console.log(foo);
    `,
    {
        compact: true,
        controlFlowFlattening: true
    }
);

console.log(obfuscationResult.getObfuscatedCode());
console.log(obfuscationResult.getSourceMap());
console.log(obfuscationResult.getIdentifierNamesCache());
```

### Multiple Files

```javascript
const sourceCodesObject = {
    'file1.js': 'var foo = 1;',
    'file2.js': 'var bar = 2;'
};

const obfuscationResults = JavaScriptObfuscator.obfuscateMultiple(
    sourceCodesObject,
    options
);
```

### Identifier Names Cache (Cross-File Consistency)

```javascript
// First file
const result1 = JavaScriptObfuscator.obfuscate(code1, {
    identifierNamesCache: {},
    renameGlobals: true
});
const cache = result1.getIdentifierNamesCache();

// Second file using same cache
const result2 = JavaScriptObfuscator.obfuscate(code2, {
    identifierNamesCache: cache,
    renameGlobals: true
});
```

## Browser Support

The project includes a browser build at `dist/index.browser.js` that can be used in web environments:

```html
<script src="https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js"></script>
<script>
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code, options);
</script>
```

**Note**: No eval() in `browser-no-eval` target.

## Build System

### Webpack Configuration

- **Node.js build**: `webpack/webpack.node.config.js`
  - Target: CommonJS module
  - External dependencies: node_modules
  - Output: `dist/index.js`

- **Browser build**: `webpack/webpack.browser.config.js`
  - Target: UMD module
  - Bundled dependencies
  - Output: `dist/index.browser.js`

### Build Scripts

```bash
# Production build
npm run build

# Development watch mode
npm run watch

# Build TypeScript typings
npm run build:typings

# Linting
npm run eslint
```

## Testing

### Test Structure

**Location**: `test/`

- **Functional tests**: Feature-level tests for transformers and options
- **Unit tests**: Component-level tests
- **Performance tests**: Memory and speed benchmarks

### Running Tests

#### Quick Start

```bash
# Install dependencies first
npm install
# or
yarn install

# Run all tests (includes dev test, coverage, and memory performance)
npm test
# or
yarn test
```

#### Individual Test Commands

```bash
# Run full test suite (test:dev + test:mocha-coverage + test:mocha-memory-performance). This is slow.
npm run test:full
yarn run test:full

# Run Mocha tests only (no coverage)
npm run test:mocha
yarn run test:mocha

# Run tests with coverage report
npm run test:mocha-coverage
yarn run test:mocha-coverage

# Generate detailed coverage report (after running test:mocha-coverage)
npm run test:mocha-coverage:report
yarn run test:mocha-coverage:report

# Run memory performance tests (tests memory constraints)
npm run test:mocha-memory-performance
yarn run test:mocha-memory-performance

# Run development test (custom dev test file)
npm run test:dev
yarn run test:dev

# Run compile performance test
npm run test:devCompilePerformance
yarn run test:devCompilePerformance

# Run runtime performance test
npm run test:devRuntimePerformance
yarn run test:devRuntimePerformance
```

#### Test Details

**test:full**
- Runs the complete test suite
- Includes: development tests, coverage tests, and memory performance tests
- This is what runs when you execute `npm test`

**test:mocha**
- Runs all Mocha tests from `test/index.spec.ts`
- Uses ts-node for TypeScript execution
- No code coverage reporting

**test:mocha-coverage**
- Runs Mocha tests with NYC (Istanbul) code coverage
- Allocates up to 4GB memory (`--max-old-space-size=4096`)
- Generates coverage reports (text-summary by default)
- Use `test:mocha-coverage:report` to generate detailed lcov report

**test:mocha-memory-performance**
- Tests obfuscator memory usage under constraints
- Allocates only 280MB memory to test memory efficiency
- Located at: `test/performance-tests/JavaScriptObfuscatorMemory.spec.ts`

**test:dev**
- Custom development test script
- Located at: `test/dev/dev.ts`
- Useful for quick testing during development

### Test Configuration Files

- **`.mocharc.json`**: Mocha test runner configuration
- **`.nycrc.json`**: NYC (Istanbul) coverage tool configuration
- **TypeScript**: Uses ts-node for direct TS execution without compilation

### Running Specific Test Files

You can run individual test files or groups of tests for faster iteration during development.

#### Basic Command Format

```bash
npx mocha --require ts-node/register --require source-map-support/register <path-to-test-file>
```

#### Common Examples

```bash
# Run a specific test file by exact path
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/options/Options.spec.ts

# Run CLI tests
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/cli/JavaScriptObfuscatorCLI.spec.ts

# Run a specific analyzer test
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.spec.ts

# Run scope analyzer tests
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/analyzers/scope-analyzer/ScopeAnalyzer.spec.ts

# Run string array tests
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/custom-code-helpers/string-array/StringArrayCodeHelper.spec.ts

# Run self-defending code tests
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/custom-code-helpers/self-defending/SelfDefendingCodeHelper.spec.ts
```

#### Pattern Matching

Use glob patterns to run multiple related test files:

```bash
# Run all options-related tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/options/**/*.spec.ts"

# Run all analyzer tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/analyzers/**/*.spec.ts"

# Run all string array related tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/**/*StringArray*.spec.ts"

# Run all control flow tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/**/*ControlFlow*.spec.ts"

# Run all node transformer tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/node-transformers/**/*.spec.ts"

# Run all unit tests only
npx mocha --require ts-node/register --require source-map-support/register "test/unit-tests/**/*.spec.ts"

# Run all functional tests only
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/**/*.spec.ts"
```

#### Running Tests by Category

The test suite is organized into these main categories:

**Functional Tests** (`test/functional-tests/`):
```bash
# Options tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/options/**/*.spec.ts"

# Analyzers tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/analyzers/**/*.spec.ts"

# Node transformers tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/node-transformers/**/*.spec.ts"

# Code transformers tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/code-transformers/**/*.spec.ts"

# Custom code helpers tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/custom-code-helpers/**/*.spec.ts"

# Storage tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/storages/**/*.spec.ts"

# CLI tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/cli/**/*.spec.ts"

# Generator tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/generators/**/*.spec.ts"

# Main obfuscator tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/javascript-obfuscator/**/*.spec.ts"

# Issue regression tests
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/issues/**/*.spec.ts"
```

**Unit Tests** (`test/unit-tests/`):
```bash
# All unit tests
npx mocha --require ts-node/register --require source-map-support/register "test/unit-tests/**/*.spec.ts"

# Options unit tests
npx mocha --require ts-node/register --require source-map-support/register "test/unit-tests/options/**/*.spec.ts"

# Utils unit tests
npx mocha --require ts-node/register --require source-map-support/register "test/unit-tests/utils/**/*.spec.ts"

# Node utilities unit tests
npx mocha --require ts-node/register --require source-map-support/register "test/unit-tests/node/**/*.spec.ts"
```

**Performance Tests** (`test/performance-tests/`):
```bash
# Memory performance tests
npx mocha --require ts-node/register --require source-map-support/register test/performance-tests/JavaScriptObfuscatorMemory.spec.ts
```

#### Using Mocha Options with Individual Tests

```bash
# Run with grep to filter by test description
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/options/Options.spec.ts --grep "compact"

# Run and show slow tests
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/options/Options.spec.ts --reporter spec

# Run with timeout override (default is 10000ms)
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/options/Options.spec.ts --timeout 20000

# Run with bail (stop on first failure)
npx mocha --require ts-node/register --require source-map-support/register "test/functional-tests/**/*.spec.ts" --bail

# Run and watch for changes
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/options/Options.spec.ts --watch

# Run with specific reporter
npx mocha --require ts-node/register --require source-map-support/register test/functional-tests/options/Options.spec.ts --reporter json
```

#### Creating Test Aliases (Optional)

For convenience, you can add these aliases to your `package.json` scripts:

```json
{
  "scripts": {
    "test:options": "mocha --require ts-node/register --require source-map-support/register 'test/functional-tests/options/**/*.spec.ts'",
    "test:analyzers": "mocha --require ts-node/register --require source-map-support/register 'test/functional-tests/analyzers/**/*.spec.ts'",
    "test:transformers": "mocha --require ts-node/register --require source-map-support/register 'test/functional-tests/node-transformers/**/*.spec.ts'",
    "test:unit": "mocha --require ts-node/register --require source-map-support/register 'test/unit-tests/**/*.spec.ts'",
    "test:functional": "mocha --require ts-node/register --require source-map-support/register 'test/functional-tests/**/*.spec.ts'"
  }
}
```

Then run with:
```bash
npm run test:options
npm run test:analyzers
npm run test:transformers
```

#### Tips for Running Individual Tests

1. **Use quotes around glob patterns** to prevent shell expansion:
   ```bash
   # Good
   npx mocha "test/**/*.spec.ts"

   # Bad (shell will expand the pattern)
   npx mocha test/**/*.spec.ts
   ```

2. **Use --grep to run specific test cases** within a file:
   ```bash
   npx mocha --require ts-node/register test/functional-tests/options/Options.spec.ts --grep "should enable compact"
   ```

3. **Use --bail to stop on first failure** when debugging:
   ```bash
   npx mocha --require ts-node/register "test/**/*.spec.ts" --bail
   ```

4. **Check the exit code** to verify test success in scripts:
   ```bash
   npx mocha --require ts-node/register test/functional-tests/options/Options.spec.ts && echo "Tests passed!"
   ```

5. **Combine with watch mode** for TDD workflow:
   ```bash
   npx mocha --require ts-node/register test/functional-tests/options/Options.spec.ts --watch --reporter min
   ```

## Linting

### Running ESLint

#### Quick Start

```bash
# Lint all TypeScript files in src/
npm run eslint
yarn run eslint
```

This runs: `eslint src/**/*.ts`

#### Linting Individual Files

You can lint specific files or directories for faster feedback during development.

**Basic Command Format:**
```bash
npx eslint <path-to-file-or-directory>
```

**Common Examples:**

```bash
# Lint a specific file
npx eslint src/JavaScriptObfuscator.ts

# Lint the main facade file
npx eslint src/JavaScriptObfuscatorFacade.ts

# Lint a specific transformer
npx eslint src/node-transformers/converting-transformers/StringArrayTransformer.ts

# Lint a specific analyzer
npx eslint src/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.ts

# Lint options file
npx eslint src/options/Options.ts

# Lint a custom code helper
npx eslint src/custom-code-helpers/string-array/StringArrayCodeHelper.ts

# Lint container files
npx eslint src/container/InversifyContainerFacade.ts
```

#### Linting Multiple Files or Directories

```bash
# Lint entire src directory
npx eslint src/

# Lint all files in a specific subdirectory
npx eslint src/node-transformers/

# Lint all analyzers
npx eslint src/analyzers/

# Lint all transformers
npx eslint src/node-transformers/**/*.ts

# Lint all options-related files
npx eslint src/options/

# Lint all custom code helpers
npx eslint src/custom-code-helpers/

# Lint all utils
npx eslint src/utils/

# Lint CLI files
npx eslint src/cli/

# Lint container modules
npx eslint src/container/

# Lint storage files
npx eslint src/storages/
```

#### Using Glob Patterns

```bash
# Lint all TypeScript files in src (same as npm run eslint)
npx eslint "src/**/*.ts"

# Lint all transformer files
npx eslint "src/**/*Transformer.ts"

# Lint all analyzer files
npx eslint "src/**/*Analyzer.ts"

# Lint all storage files
npx eslint "src/**/*Storage.ts"

# Lint all helper files
npx eslint "src/**/*Helper.ts"

# Lint all files containing "String" in the name
npx eslint "src/**/*String*.ts"

# Lint all files in node-transformers subdirectories
npx eslint "src/node-transformers/**/*.ts"
```

#### Auto-fixing Issues

ESLint can automatically fix many issues:

```bash
# Auto-fix all files in src/
npx eslint src/**/*.ts --fix

# Auto-fix a specific file
npx eslint src/JavaScriptObfuscator.ts --fix

# Auto-fix specific directory
npx eslint src/node-transformers/ --fix

# Auto-fix with glob pattern
npx eslint "src/analyzers/**/*.ts" --fix

# Auto-fix only safe fixes (no potentially breaking changes)
npx eslint src/JavaScriptObfuscator.ts --fix --fix-type suggestion,layout
```

#### Checking Specific Rules

```bash
# Show only errors (no warnings)
npx eslint src/JavaScriptObfuscator.ts --quiet

# Check specific rule only
npx eslint src/JavaScriptObfuscator.ts --rule 'no-console: error'

# Disable specific rules for a file check
npx eslint src/JavaScriptObfuscator.ts --rule 'no-console: off'

# Output format options
npx eslint src/JavaScriptObfuscator.ts --format stylish  # Default
npx eslint src/JavaScriptObfuscator.ts --format json     # JSON output
npx eslint src/JavaScriptObfuscator.ts --format compact  # Compact output
npx eslint src/JavaScriptObfuscator.ts --format unix     # Unix style
```

#### Getting Detailed Information

```bash
# Show more details about errors
npx eslint src/JavaScriptObfuscator.ts --format stylish

# List all files that would be linted (dry-run)
npx eslint src/ --debug 2>&1 | grep "Processing"

# Show timing information for rules
npx eslint src/JavaScriptObfuscator.ts --debug

# Get statistics about linting
npx eslint src/ --format json | jq '.[] | {file: .filePath, errors: .errorCount, warnings: .warningCount}'
```

#### Linting by Component

Organized by project structure:

**Core Files:**
```bash
npx eslint src/JavaScriptObfuscator.ts
npx eslint src/JavaScriptObfuscatorFacade.ts
npx eslint src/ASTParserFacade.ts
```

**Node Transformers:**
```bash
# All node transformers
npx eslint src/node-transformers/

# Converting transformers
npx eslint src/node-transformers/converting-transformers/

# Control flow transformers
npx eslint src/node-transformers/control-flow-transformers/

# String array transformers
npx eslint src/node-transformers/string-array-transformers/

# Rename transformers
npx eslint src/node-transformers/rename-identifiers-transformers/
npx eslint src/node-transformers/rename-properties-transformers/
```

**Analyzers:**
```bash
# All analyzers
npx eslint src/analyzers/

# Specific analyzers
npx eslint src/analyzers/calls-graph-analyzer/
npx eslint src/analyzers/scope-analyzer/
npx eslint src/analyzers/string-array-storage-analyzer/
```

**Options System:**
```bash
# All options files
npx eslint src/options/

# Core options
npx eslint src/options/Options.ts
npx eslint src/options/OptionsNormalizer.ts

# Validators
npx eslint src/options/validators/

# Presets
npx eslint src/options/presets/
```

**Custom Code Helpers:**
```bash
# All helpers
npx eslint src/custom-code-helpers/

# String array helpers
npx eslint src/custom-code-helpers/string-array/

# Debug protection helpers
npx eslint src/custom-code-helpers/debug-protection/

# Self-defending helpers
npx eslint src/custom-code-helpers/self-defending/
```

**Utilities:**
```bash
# All utils
npx eslint src/utils/

# Specific utils
npx eslint src/utils/RandomGenerator.ts
npx eslint src/utils/ArrayUtils.ts
npx eslint src/utils/CryptUtils.ts
```

#### Integrating with Git

```bash
# Lint only staged files (useful for pre-commit)
git diff --cached --name-only --diff-filter=ACM | grep '\.ts$' | xargs npx eslint

# Lint files changed in current branch
git diff --name-only master | grep '\.ts$' | xargs npx eslint

# Lint files changed in last commit
git diff HEAD~1 --name-only | grep '\.ts$' | xargs npx eslint
```

#### Creating Lint Aliases (Optional)

Add these to your `package.json` scripts for convenience:

```json
{
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "lint:transformers": "eslint src/node-transformers/**/*.ts",
    "lint:analyzers": "eslint src/analyzers/**/*.ts",
    "lint:options": "eslint src/options/**/*.ts",
    "lint:utils": "eslint src/utils/**/*.ts",
    "lint:quiet": "eslint src/**/*.ts --quiet",
    "lint:staged": "git diff --cached --name-only --diff-filter=ACM | grep '\\.ts$' | xargs eslint"
  }
}
```

Then run with:
```bash
npm run lint:transformers
npm run lint:analyzers
npm run lint:fix
```

### ESLint Configuration

**Location**: `.eslintrc.js`

The project uses:
- **@typescript-eslint**: TypeScript-specific linting rules
- **eslint-plugin-import**: Import/export validation
- **eslint-plugin-jsdoc**: JSDoc comment validation
- **eslint-plugin-no-null**: Prevents null usage (prefer undefined)
- **eslint-plugin-prefer-arrow**: Enforces arrow functions
- **eslint-plugin-unicorn**: Additional code quality rules

**Ignored files**: `.eslintignore`

#### Viewing Current ESLint Config

```bash
# Print effective configuration for a file
npx eslint --print-config src/JavaScriptObfuscator.ts

# List all rules being applied
npx eslint --print-config src/JavaScriptObfuscator.ts | grep rules -A 1000
```

### Code Quality Checks

```bash
# Run full build (includes webpack, eslint, and tests)
npm run build
yarn run build

# The build script runs:
# 1. webpack:prod (production build)
# 2. eslint (linting)
# 3. test (full test suite)
```

### Tips for Effective Linting

1. **Lint before committing**: Always run linting before creating commits
   ```bash
   npx eslint src/ && git commit -m "Your message"
   ```

2. **Use --fix cautiously**: Review changes before committing auto-fixes
   ```bash
   npx eslint src/MyFile.ts --fix
   git diff  # Review changes
   ```

3. **Focus on errors first**: Use `--quiet` to see only errors
   ```bash
   npx eslint src/ --quiet
   ```

4. **Lint specific files during development**: Don't lint everything when working on one file
   ```bash
   npx eslint src/node-transformers/MyNewTransformer.ts
   ```

5. **Check exit code**: Useful in scripts and CI/CD
   ```bash
   npx eslint src/ || echo "Linting failed!"
   ```

## Development Workflow

### Setting Up Development Environment

```bash
# 1. Clone the repository
git clone https://github.com/javascript-obfuscator/javascript-obfuscator.git
cd javascript-obfuscator

# 2. Install dependencies
npm install
# or
yarn install

# 3. Install Husky hooks (for pre-commit checks)
npm run prepare
# or
yarn run prepare
```

### Development Commands

```bash
# Start development mode with watch (auto-recompile on changes)
npm start
# or
npm run watch
# or
yarn run watch

# Build for production
npm run webpack:prod
yarn run webpack:prod

# Build TypeScript type definitions
npm run build:typings
yarn run build:typings

# Full build (webpack + eslint + tests)
npm run build
yarn run build
```

### Pre-commit Hooks

The project uses **Husky** for git hooks:

- **pre-commit**: Automatically runs `npm run build` before each commit
  - Ensures code compiles
  - Ensures linting passes
  - Ensures all tests pass

**Configuration**: `.husky/` directory

### Development Tips

1. **Use watch mode during development**:
   ```bash
   npm run watch
   ```
   This rebuilds automatically when you save files.

2. **Run specific tests during development**:
   ```bash
   npm run test:dev
   ```
   Faster than full test suite.

3. **Check linting before committing**:
   ```bash
   npm run eslint
   ```
   Fix issues before the pre-commit hook runs.

4. **Test memory usage**:
   ```bash
   npm run test:mocha-memory-performance
   ```
   Ensure your changes don't cause memory issues.

5. **Generate coverage reports**:
   ```bash
   npm run test:mocha-coverage
   npm run test:mocha-coverage:report
   ```
   Check test coverage in the generated `coverage/` directory.

## Performance Considerations

### Impact on Code Size

- **Default**: ~15-30% increase
- **Dead Code Injection**: Up to 200% increase
- **String Array**: 20-50% increase
- **Control Flow Flattening**: 30-80% increase

### Runtime Performance

- **No obfuscation**: Baseline
- **Low preset**: ~10-20% slower
- **Medium preset**: ~30-50% slower
- **High preset**: ~50-80% slower

### Optimization Tips

1. Use **thresholds** to apply transformations selectively:
   - `controlFlowFlatteningThreshold`
   - `deadCodeInjectionThreshold`
   - `stringArrayThreshold`

2. Avoid obfuscating:
   - Third-party libraries
   - Polyfills
   - Large vendor bundles

3. Use **seed** option for reproducible builds

4. Enable **simplify** for better performance (enabled by default)

## Security Considerations

### What It Protects

- Makes reverse engineering harder
- Prevents casual code inspection
- Protects string literals and algorithms
- Adds anti-debugging measures
- Can lock code to specific domains

### What It Doesn't Protect

- Determined attackers with time and tools
- Network traffic and API endpoints
- Runtime behavior analysis
- Secrets embedded in code (use environment variables!)

### Best Practices

1. **Never obfuscate secrets**: Use environment variables or secure vaults
2. **Combine with other protections**: Minification, HTTPS, CSP headers
3. **Test thoroughly**: Obfuscation can introduce subtle bugs
4. **Monitor performance**: High obfuscation impacts runtime speed
5. **Use source maps carefully**: Keep them private for debugging

## Conditional Comments

Control obfuscation for specific code sections:

```javascript
var foo = 1;
// javascript-obfuscator:disable
var bar = 2; // This won't be obfuscated
// javascript-obfuscator:enable
var baz = 3;
```

## Integration with Build Tools

### Webpack

Use [webpack-obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator) plugin

### Gulp

Use [gulp-javascript-obfuscator](https://github.com/javascript-obfuscator/gulp-javascript-obfuscator)

### Rollup

Use [rollup-plugin-javascript-obfuscator](https://github.com/javascript-obfuscator/rollup-plugin-javascript-obfuscator)

### Grunt

Use [grunt-contrib-obfuscator](https://github.com/javascript-obfuscator/grunt-contrib-obfuscator)

## Common Issues and Solutions

### Issue: Code breaks after obfuscation

**Solutions**:
- Add function/variable names to `reservedNames`
- Add strings to `reservedStrings`
- Use `renamePropertiesMode: 'safe'` instead of 'unsafe'
- Disable `renameProperties` if safe mode doesn't work
- Check for dynamic property access like `obj[dynamicKey]`

### Issue: Performance is too slow

**Solutions**:
- Use lower obfuscation preset
- Reduce threshold values
- Disable `controlFlowFlattening` and `deadCodeInjection`
- Use `target: 'browser-no-eval'` if applicable

### Issue: Code size is too large

**Solutions**:
- Disable `deadCodeInjection`
- Reduce `stringArrayWrappersCount`
- Use lower `stringArrayThreshold`
- Disable `unicodeEscapeSequence`

### Issue: Source maps not working

**Solutions**:
- Ensure `sourceMap: true` in options
- Set correct `sourceMapMode` ('inline' or 'separate')
- Specify `inputFileName` when using NodeJS API
- Use `sourceMapSourcesMode: 'sources-content'` for embedded source

### Issue: Domain lock not working

**Solutions**:
- Don't use with `target: 'node'`
- Test in actual browser environment
- Check domain format (`.example.com` for all subdomains)
- Ensure `domainLockRedirectUrl` is set

## Extension Points

### Adding Custom Transformers

1. Create transformer class extending `AbstractNodeTransformer`
2. Implement `getVisitor()` and `transformNode()` methods
3. Register in appropriate module (`src/container/modules/node-transformers/`)
4. Add to transformer list in `JavaScriptObfuscator.ts`
5. Add to `NodeTransformer` enum

### Adding Custom Options

1. Add property to `IOptions` interface
2. Add validation decorator in `Options.ts`
3. Add normalizer rule if needed in `options/normalizer-rules/`
4. Add preset values if applicable

### Adding Custom Code Helpers

1. Create helper group extending `AbstractCustomCodeHelperGroup`
2. Create template files in `custom-code-helpers/[group]/templates/`
3. Register in `CustomCodeHelpersModule`
4. Add to `CustomCodeHelper` enum

## TypeScript Configuration

### Main Config

**Location**: `tsconfig.json`

- **Target**: ES2018
- **Module**: CommonJS
- **Strict mode**: Enabled
- **Decorators**: Enabled (experimental)
- **Emit decorator metadata**: Enabled

### Special Configs

- `tsconfig.browser.json`: Browser-specific settings
- `tsconfig.node.json`: Node.js-specific settings
- `tsconfig.typings.json`: Type declarations generation

## Dependencies Overview

### Production Dependencies

- **@javascript-obfuscator/escodegen**: Modified escodegen for code generation
- **@javascript-obfuscator/estraverse**: Modified estraverse for AST traversal
- **acorn**: JavaScript parser (ES3-ES2020)
- **inversify**: Dependency injection container
- **eslint-scope**: Scope analysis (from ESLint)
- **class-validator**: Options validation
- **chance**: Random data generation
- **commander**: CLI argument parsing
- **chalk**: Terminal colors
- **md5**: Hashing for identifiers

### Development Dependencies

- **TypeScript**: Type system and compiler
- **Webpack**: Module bundler
- **Mocha + Chai**: Testing framework
- **NYC**: Code coverage
- **ESLint**: Code linting
- **Sinon**: Test mocking

## Contributing

**Location**: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`

1. Fork the repository
2. Create feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Follow existing code style (ESLint)
6. Submit pull request

## Versioning and Releases

- Follows semantic versioning (SemVer)
- Changelog maintained in `CHANGELOG.md`
- Precommit hooks run build and tests (Husky)
- Automated CI/CD via GitHub Actions

## Support and Community

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **GitHub Sponsors**: Direct sponsorship

## License

**BSD-2-Clause License**

Copyright (C) 2016-2026 Timofei Kachalov

See `LICENSE.BSD` for full license text.

## Project Statistics

- **First Release**: 2016
- **Language**: TypeScript (~90% of codebase)
- **Test Coverage**: Extensive functional and unit test suite
- **Supported JavaScript Versions**: ES3, ES5, ES2015-ES2019, partial ES2020
- **Downloads**: Widely used in production applications
- **Maintenance**: Actively maintained

## Resources

- **Main Repository**: https://github.com/javascript-obfuscator/javascript-obfuscator
- **Online Tool**: https://obfuscator.io
- **NPM Package**: https://www.npmjs.com/package/javascript-obfuscator
- **Documentation**: In README.md and inline code comments

---

## Quick Reference: File Locations

| Component | Primary Location |
|-----------|------------------|
| Main Obfuscator | `src/JavaScriptObfuscator.ts` |
| Public API | `src/JavaScriptObfuscatorFacade.ts` |
| CLI | `bin/javascript-obfuscator`, `src/JavaScriptObfuscatorCLIFacade.ts` |
| Options | `src/options/Options.ts` |
| Transformers | `src/node-transformers/` |
| Analyzers | `src/analyzers/` |
| DI Container | `src/container/InversifyContainerFacade.ts` |
| Tests | `test/` |
| Build Config | `webpack/` |
| Distribution | `dist/` |

## Quick Reference: Key Enums

- **CodeTransformationStage**: PreparingTransformers, FinalizingTransformers
- **NodeTransformationStage**: Initializing, Preparing, DeadCodeInjection, ControlFlowFlattening, RenameProperties, Converting, RenameIdentifiers, StringArray, Simplifying, Finalizing
- **OptionsPreset**: default, low-obfuscation, medium-obfuscation, high-obfuscation
- **StringArrayEncoding**: none, base64, rc4
- **IdentifierNamesGenerator**: hexadecimal, mangled, mangled-shuffled, dictionary
- **RenamePropertiesMode**: safe, unsafe
- **Target**: browser, browser-no-eval, node
