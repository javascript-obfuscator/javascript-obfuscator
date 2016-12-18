export class BabelPolyfill {
    public static append (): void {
        if (!(<any>global)._babelPolyfill) {
            require('babel-polyfill');
        }
    }
}
