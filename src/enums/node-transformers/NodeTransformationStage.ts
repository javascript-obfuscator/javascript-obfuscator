export enum NodeTransformationStage {
    ControlFlowFlattening = 'ControlFlowFlattening',
    Converting = 'Converting',
    DeadCodeInjection = 'DeadCodeInjection',
    Finalizing = 'Finalizing',
    Initializing = 'Initializing',
    Preparing = 'Preparing',
    RenameIdentifiers = 'RenameIdentifiers',
    RenameProperties = 'RenameProperties',
    Simplifying = 'Simplifying',
    StringArray = 'StringArray'
}
