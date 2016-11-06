export interface IPackageConfig {
    bin?: string | {[name: string]: string};
    bugs?: {[key: string]: string};
    bundledDependencies?: {[name: string]: string};
    config?: {[name: string]: string};
    cpu?: string[];
    dependencies?: {[name: string]: string};
    description?: string;
    devDependencies?: {[name: string]: string};
    directories?: any;
    engines?: {[name: string]: string};
    files?: string[];
    homepage?: string;
    keywords?: string[];
    license?: string;
    main?: string;
    man?: string | string[];
    name: string;
    optionalDependencies?: {[name: string]: string};
    os?: string[];
    peerDependencies?: {[name: string]: string};
    preferGlobal?: boolean;
    'private'?: boolean;
    repository?: string | {
        type: string;
        url: string;
    };
    scripts?: {[name: string]: string};
    version: string;
}
