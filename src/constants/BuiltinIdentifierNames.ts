/**
 * Core JavaScript built-in global objects
 */
export const CORE_JS_BUILTINS: ReadonlySet<string> = new Set([
    'Object',
    'Function',
    'Boolean',
    'Symbol',
    'Error',
    'AggregateError',
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
    'Number',
    'BigInt',
    'Math',
    'Date',
    'String',
    'RegExp',
    'Array',
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'BigInt64Array',
    'BigUint64Array',
    'Float32Array',
    'Float64Array',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'WeakRef',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Atomics',
    'JSON',
    'Promise',
    'Proxy',
    'Reflect',
    'Intl',
    'console'
]);

/**
 * Global functions available in all environments
 */
export const GLOBAL_FUNCTIONS: ReadonlySet<string> = new Set([
    'parseInt',
    'parseFloat',
    'isNaN',
    'isFinite',
    'eval',
    'encodeURI',
    'encodeURIComponent',
    'decodeURI',
    'decodeURIComponent',
    'setTimeout',
    'setInterval',
    'clearTimeout',
    'clearInterval',
    'queueMicrotask',
    'structuredClone',
    'atob',
    'btoa'
]);

/**
 * Browser-specific global objects and APIs
 */
export const BROWSER_API_OBJECTS: ReadonlySet<string> = new Set([
    'document',
    'window',
    'navigator',
    'location',
    'history',
    'screen',
    'performance',
    'localStorage',
    'sessionStorage',
    'indexedDB',
    'crypto',
    'fetch',
    'XMLHttpRequest',
    'URL',
    'URLSearchParams',
    'FormData',
    'Headers',
    'Request',
    'Response',
    'AbortController',
    'AbortSignal',
    'Blob',
    'File',
    'FileReader',
    'MutationObserver',
    'IntersectionObserver',
    'ResizeObserver',
    'PerformanceObserver',
    'WebSocket',
    'Worker',
    'SharedWorker',
    'ServiceWorker',
    'BroadcastChannel',
    'EventSource',
    'CustomEvent',
    'Event',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'requestIdleCallback',
    'cancelIdleCallback',
    'getComputedStyle',
    'matchMedia',
    'alert',
    'confirm',
    'prompt'
]);

/**
 * Node.js-specific global objects and APIs
 */
export const NODE_API_OBJECTS: ReadonlySet<string> = new Set([
    'process',
    'Buffer',
    'global',
    '__dirname',
    '__filename',
    'require',
    'module',
    'exports'
]);

/**
 * Combined set of all built-in identifiers (environment-independent)
 */
export const ALL_BUILTINS: ReadonlySet<string> = new Set([
    ...CORE_JS_BUILTINS,
    ...GLOBAL_FUNCTIONS,
    ...BROWSER_API_OBJECTS,
    ...NODE_API_OBJECTS
]);
