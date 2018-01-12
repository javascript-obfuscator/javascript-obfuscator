export enum TransformationStage {
    Preparing = 'Preparing',
    DeadCodeInjection = 'DeadCodeInjection',
    ControlFlowFlattening = 'ControlFlowFlattening',
    Converting = 'Converting',
    Obfuscating = 'Obfuscating',
    Finalizing = 'Finalizing'
}
