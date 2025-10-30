# JavaScript Obfuscator - Project Documentation

## Project Overview

**JavaScript Obfuscator** is a powerful, enterprise-grade code obfuscation tool for JavaScript and Node.js applications. It transforms readable JavaScript code into a protected, difficult-to-understand format while maintaining full functionality. The project is widely used for protecting intellectual property and preventing reverse engineering.

- **Version**: 4.1.1
- **Author**: Timofey Kachalov (@sanex3339)
- **License**: BSD-2-Clause
- **Repository**: https://github.com/javascript-obfuscator/javascript-obfuscator
- **Homepage**: https://obfuscator.io/
- **Node Requirement**: >=12.22.0

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

```bash
# All tests
npm test

# Unit tests only
npm run test:mocha

# With coverage
npm run test:mocha-coverage

# Memory performance
npm run test:mocha-memory-performance

# Development test
npm run test:dev
```

### Test Configuration

- **Mocha**: `.mocharc.json`
- **NYC (Istanbul)**: `.nycrc.json`
- **TypeScript**: Uses ts-node for direct TS execution

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
- **OpenCollective**: Financial support and sponsorship
- **GitHub Sponsors**: Direct sponsorship

## License

**BSD-2-Clause License**

Copyright (C) 2016-2024 Timofey Kachalov

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
