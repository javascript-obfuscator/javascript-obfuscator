const fs = require('fs');

const copyright = 'Copyright (C) 2016-2018 Timofey Kachalov <sanex3339@yandex.ru>';
const sourceMapSupportRequire = 'require("source-map-support").install();';

class WebpackUtils {
    /**
     * @param entries
     * @returns {string[]}
     */
    static getBannerText (...entries) {
        const lineSeparator = '\n\n';

        return entries.reduce((bannerText, entry) => {
            return `${bannerText}${entry}${lineSeparator}`
        }, '');
    }

    static getLicenseText () {
        return `/*!\n${copyright}\n\n` +
            fs.readFileSync('./LICENSE.BSD', 'utf8') + "\n*/";
    }

    static getSourceMapSupportImport () {
        return sourceMapSupportRequire;
    }
}

module.exports.WebpackUtils = WebpackUtils;
