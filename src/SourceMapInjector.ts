import { TSourceMapModes } from "./types/TSourceMapModes";

import { SourceMapMode } from "./enums/SourceMapMode";

import { Utils } from "./Utils";

export class SourceMapInjector {
    /**
     * @param sourceCode
     * @param url
     * @param mode
     * @returns {string}
     */
    public static inject (sourceCode: string, url: string, mode: TSourceMapModes): string {
        let sourceMappingUrl: string = '//# sourceMappingURL=';

        switch (mode) {
            case SourceMapMode.Inline:
                sourceMappingUrl += `data:application/json;base64,${Utils.btoa(url, false)}`;

                break;

            case SourceMapMode.Separate:
            default:
                sourceMappingUrl += url;
        }

        return `${sourceCode}\n${sourceMappingUrl}`;
    }
}
