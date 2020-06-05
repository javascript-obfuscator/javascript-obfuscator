export enum NodeTransformationStage {
    Initializing = 'Initializing',
    Preparing = 'Preparing',
    MangleProperties = 'MangleProperties',
    DeadCodeInjection = 'DeadCodeInjection',
    ControlFlowFlattening = 'ControlFlowFlattening',
    Converting = 'Converting',
    Obfuscating = 'Obfuscating',
    Finalizing = 'Finalizing'
}
