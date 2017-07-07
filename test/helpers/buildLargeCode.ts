export function buildLargeCode (linesOfCode: number): string {
    return new LargeCodeBuilder(linesOfCode).build();
}

class LargeCodeBuilder {
    /**
     * @type {string}
     */
    private code: string = '';

    /**
     * @type {number}
     */
    private readonly linesOfCode: number;

    /**
     * @param {number} linesOfCode
     */
    constructor (linesOfCode: number) {
        this.linesOfCode = linesOfCode;
    }

    public build (): string {
        const lastLineIndex: number = this.linesOfCode - 1;

        let funcIndex: number = 0,
            isFuncWasOpened: boolean = false;

        this.addLine(`function Foo () {`);
        this.addLine(`var var0 = 0;`);

        for (let index = 0; index < this.linesOfCode; index++) {
            const step: number = index % 10;
            const newIndex: number = index + 1;
            const isLastLine: boolean = index === lastLineIndex;

            if (step === 3) {
                funcIndex = index;
                isFuncWasOpened = true;
                this.addLine(`function func${funcIndex} () {`);
                this.addLine(`var var${newIndex} = var${index};`);
            }

            if (step === 4) {
                this.addLine(`if (true) {`);
            }

            if (step === 6) {
                this.addLine(`if (true) {`);
            }

            this.addLine(`var var${newIndex} = var${index};`);
            this.addLine(`var${newIndex}++;`);

            if (step === 9 || (isLastLine && isFuncWasOpened)) {
                isFuncWasOpened = false;
                this.addLine(`}`);
                this.addLine(`}`);
                this.addLine(`return var${newIndex};`);
                this.addLine(`}`);
                this.addLine(`var var${newIndex} = func${funcIndex}();`);
            }

            if (isLastLine) {
                this.addLine(`result = var${newIndex};`);
            }
        }

        this.addLine(`return result;`);
        this.addLine(`}`);
        this.addLine(`Foo();`);

        return this.code;
    }

    /**
     * @param {string} line
     * @returns {string}
     */
    private addLine (line: string): void {
        this.code += `\n${line}`;
    }
}
