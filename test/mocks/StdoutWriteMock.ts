export class StdoutWriteMock {
    /**
     * @type any
     */
    private stdoutWrite: any;

    /**
     * @type any
     */
    private stdoutWriteMock: any = (() => {});

    /**
     * @param stdoutWrite
     */
    constructor (stdoutWrite: any) {
        this.stdoutWrite = stdoutWrite;
    }

    public mute (): void {
        process.stdout.write = this.stdoutWriteMock;
    }

    public restore (): void {
        process.stdout.write = this.stdoutWrite;
    }
}
