declare module 'source-map-resolve' {
    interface ExistingRawSourceMap {
        mappings: string;
        sources: string[];
        sourcesContent: string[];
    }

    export interface ResolvedSources {
        sourcesResolved: string[];
        sourcesContent: (string | Error)[];
    }

    export function resolveSources(
        map: ExistingRawSourceMap,
        mapUrl: string,
        read: (path: string, callback: (error: Error | null, data: Buffer | string) => void) => void,
        callback: (error: Error | null, result: ResolvedSources) => void,
    ): void;
}