declare module 'threads' {
    type PostMessage <U> = (data: U) => void;
    type SpawnCallback <T, U> = (data: T, postMessage: PostMessage <U>) => void;
    type ResponseCallback <U> = (response: U) => void;

    class Thread <T, U> {
        public killed: boolean;

        public send (data: T): Thread <T, U>;
        public on (eventType: string, responseCallback: ResponseCallback<U>): Thread <T, U>;
        public kill (): void;
    }

    export function spawn <T, U> (spawnCallback: SpawnCallback <T, U>): Thread <T, U>;
}
