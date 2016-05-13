declare namespace estraverse {
    interface Callbacks {
        enter?: (node: any, parent: any) => any;
        leave?: (node: any, parent: any) => any;

        fallback?: string;

        // Methods provided for you, don't override.
        break?: () => void;
        remove?: () => void;
        skip?: () => void;
        keys?: {};
    }

    enum VisitorOption {
        Skip, Break, Remove
    }

    function traverse (astTree: any, callbacks: Callbacks): any;
    function replace (astTree: any, callbacks: Callbacks): any;
}

declare module "estraverse" {
    export = estraverse;
}