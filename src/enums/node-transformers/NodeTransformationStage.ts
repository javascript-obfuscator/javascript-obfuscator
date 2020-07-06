export enum NodeTransformationStage {
    Initializing = 'Initializing',
    Preparing = 'Preparing',
    DeadCodeInjection = 'DeadCodeInjection',
    ControlFlowFlattening = 'ControlFlowFlattening',
    RenameProperties = 'RenameProperties',
    Converting = 'Converting',
    Obfuscating = 'Obfuscating',
    Simplifying = 'Simplifying',
    Finalizing = 'Finalizing'
}
