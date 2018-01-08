export enum LoggingMessage {
    EmptySourceCode = 'Empty source code. Obfuscation canceled...',
    ObfuscationCompleted = 'Obfuscation completed. Total time: %s sec.',
    ObfuscationStarted = 'Obfuscation started...',
    RandomGeneratorSeed = 'Random generator seed: %s...',
    StagePreparingASTTree = 'Stage: preparing AST-tree...',
    StageAnalyzingASTTree = 'Stage: analyzing AST-tree...',
    StageControlFlowFlattening = 'Stage: control flow flattening...',
    StageDeadCodeInjection = 'Stage: dead code injection...',
    StagePostObfuscation = 'Stage: post-obfuscation...',
    StagePreObfuscation = 'Stage: pre-obfuscation...',
    StageObfuscation = 'Stage: obfuscation...',
    Version = 'Version: %s'
}
