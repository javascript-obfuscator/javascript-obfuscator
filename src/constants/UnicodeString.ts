/* eslint-disable */

// import { alphabetString } from "./AlphabetString"
// import { alphabetStringUppercase } from "./AlphabetStringUppercase"

//https://www.ssec.wisc.edu/~tomw/java/unicode.html#x0000

const unicode = {
    // 'Basic Latin': [0x0000, 0x007E /* 0x007F */], //	0-127	
    // 'Latin-1 Supplement': [0x0080, 0x00FF], //	128-255	
    'Latin Extended-A': [0x0100, 0x017F], //	256-383	
    'Latin Extended-B': [0x0180, 0x0233, 0x024F], //	384-591	
    'IPA Extensions': [0x0250, 0x02AD, 0x02AF], //	592-687	
    'Spacing Modifier Letters': [0x02B0, 0x02C1, 0x02FF], //	688-767	
    // 'Combining Diacritical Marks': [0x0300, 0x0362, 0x036F], //	768-879	
    // 'Greek': [/* 0x0370 */0x038E, 0x03F3, 0x03FF], //	880-1023	
    // 'Cyrillic': [0x0400, 0x04F9, 0x04FF], //	1024-1279	
    'Armenian': [/* 0x0530 */0x0531, 0x0556, 0x058F], //	1328-1423	
    'Hebrew': [/* 0x0590 */0x05D0, 0x05F2, 0x05FF], //	1424-1535	
    'Arabic': [0x0600, 0x06FE, 0x06FF], //	1536-1791	
    'Syriac': [0x0700, 0x074A, 0x074F], //	1792-1871	
    'Thaana': [0x0780, 0x07B0, 0x07BF], //	1920-1983	
    'Devanagari': [0x0900, 0x0970, 0x097F], //	2304-2431	
    'Bengali': [0x0980, 0x09FA, 0x09FF], //	2432-2559	
    'Gurmukhi': [0x0A00, 0x0A74, 0x0A7F], //	2560-2687	
    'Gujarati': [0x0A80, 0x0AEF, 0x0AFF], //	2688-2815	
    'Oriya': [0x0B00, 0x0B70, 0x0B7F], //	2816-2943	
    'Tamil': [0x0B80, 0x0BF2, 0x0BFF], //	2944-3071	
    'Telugu': [0x0C00, 0x0C6F, 0x0C7F], //	3072-3199	
    'Kannada': [0x0C80, 0x0CEF, 0x0CFF], //	3200-3327	
    'Malayalam': [0x0D00, 0x0D6F, 0x0D7F], //	3328-3455	
    'Sinhala': [0x0D80, 0x0DF4, 0x0DFF], //	3456-3583	
    'Thai': [0x0E00, 0x0E5B, 0x0E7F], //	3584-3711	
    'Lao': [0x0E80, 0x0EDD, 0x0EFF], //	3712-3839	
    'Tibetan': [0x0F00, 0x0FCF, 0x0FFF], //	3840-4095	
    'Myanmar': [0x1000, 0x1059, 0x109F], //	4096-4255	
    'Georgian': [0x10A0, 0x10FB, 0x10FF], //	4256-4351	
    'Hangul Jamo': [0x1100, 0x11F9, 0x11FF], //	4352-4607	
    'Ethiopic': [0x1200, 0x137C, 0x137F], //	4608-4991	
    'Cherokee': [0x13A0, 0x13F4, 0x13FF], //	5024-5119	
    'Unified Canadian Aboriginal Syllabics': [0x1400, 0x1676, 0x167F], //	5120-5759	
    'Ogham': [0x1680, 0x169C, 0x169F], //	5760-5791	
    'Runic': [0x16A0, 0x16F0, 0x16FF], //	5792-5887	
    'Khmer': [0x1780, 0x17E9, 0x17FF], //	6016-6143	
    'Mongolian': [0x1800, 0x18A9, 0x18AF], //	6144-6319	
    'Latin Extended Additional': [0x1E00, 0x1EF9, 0x1EFF], //	7680-7935	
    'Greek Extended': [0x1F00, 0x1FFE, 0x1FFF], //	7936-8191	
    'General Punctuation': [0x2000, 0x206F], //	8192-8303	
    'Superscripts and Subscripts': [0x2070, 0x208E, 0x209F], //	8304-8351	
    'Currency Symbols': [0x20A0, 0x20AF, 0x20CF], //	8352-8399	
    'Combining Marks for Symbols': [0x20D0, 0x20E3, 0x20FF], //	8400-8447	
    'Letterlike Symbols': [0x2100, 0x213A, 0x214F], //	8448-8527	
    'Number Forms': [0x2150, 0x2183, 0x218F], //	8528-8591	
    'Arrows': [0x2190, 0x21F3, 0x21FF], //	8592-8703	
    'Mathematical Operators': [0x2200, 0x22F1, 0x22FF], //	8704-8959	
    'Miscellaneous Technical': [0x2300, 0x239A, 0x23FF], //	8960-9215	
    'Control Pictures': [0x2400, 0x2426, 0x243F], //	9216-9279	
    'Optical Character Recognition': [0x2440, 0x244A, 0x245F], //	9280-9311	
    'Enclosed Alphanumerics': [0x2460, 0x24EA, 0x24FF], //	9312-9471	
    // 'Box Drawing': [0x2500, 0x257F, 0x257F], //	9472-9599	
    // 'Block Elements': [0x2580, 0x2595, 0x259F], //	9600-9631	
    // 'Geometric Shapes': [0x25A0, 0x25F7, 0x25FF], //	9632-9727	
    // 'Miscellaneous Symbols': [0x2600, 0x2671, 0x26FF], //	9728-9983	
    // 'Dingbats': [0x2700, 0x27BE, 0x27BF], //	9984-10175	
    // 'Braille Patterns': [0x2800, 0x28FF], //	10240-10495	
    // 'CJK Radicals Supplement': [0x2E80, 0x2EF3, 0x2EFF], //	11904-12031	
    //'Kangxi Radicals': [0x2F00, 0x2FD5, 0x2FDF], //	12032-12255	
    // 'Ideographic Description Characters': [0x2FF0, 0x2FFB, 0x2FFF], //	12272-12287	
    // 'CJK Symbols and Punctuation': [0x3000,  0x303F], //	12288-12351	
    'Hiragana': [0x3040, 0x309E, 0x309F], //	12352-12447	
    'Katakana': [0x30A0, 0x30FE, 0x30FF], //	12448-12543	
    'Bopomofo': [0x3100, 0x312C, 0x312F], //	12544-12591	
    'Hangul Compatibility Jamo': [0x3130, 0x318E, 0x318F], //	12592-12687	
    // 'Kanbun': [0x3190, 0x319F], //	12688-12703	
    'Bopomofo Extended': [0x31A0, 0x31B7, 0x31BF], //	12704-12735	
    // 'Enclosed CJK Letters and Months': [0x3200, 0x32FE, 0x32FF], //	12800-13055	
    // 'CJK Compatibility': [0x3300, 0x33FE, 0x33FF], //	13056-13311	
    'CJK Unified Ideographs Extension A': [0x3400, 0x4DB5], //	13312-19893	
    'CJK Unified Ideographs': [0x4E00, 0x9FA5, 0x9FFF], //	19968-40959	
    'Yi Syllables': [0xA000, 0xA48C, 0xA48F], //	40960-42127	
    // 'Yi Radicals': [0xA490, 0xA4C6, 0xA4CF], //	42128-42191	
    'Hangul Syllables': [0xAC00, 0xD7A3], //	44032-55203	
    // 'High Surrogates': [0xD800, 0xDB7F], //	55296-56191	
    // 'High Private Use Surrogates': [0xDB80, 0xDBFF], //	56192-56319	
    // 'Low Surrogates': [0xDC00, 0xDFFF], //	56320-57343	
    // 'Private Use': [0xE000, 0xF8FF], //	57344-63743	
    'CJK Compatibility Ideographs': [0xF900, 0xFA2D /* 0xFAFF */], //	63744-64255	
    'Alphabetic Presentation Forms': [0xFB00, 0xFB4F], //	64256-64335	
    'Arabic Presentation Forms-A': [0xFB50, 0xFDFB, 0xFDFF], //	64336-65023	
    // 'Combining Half Marks': [0xFE20, 0xFE2F], //	65056-65071	
    // 'CJK Compatibility Forms': [0xFE30, 0xFE4F], //	65072-65103	
    // 'Small Form Variants': [0xFE50, 0xFE6B, 0xFE6F], //	65104-65135	
    'Arabic Presentation Forms-B': [0xFE70, 0xFEFC, 0xFEFE], //	65136-65278	
    // 'Specials': [0xFEFF, 0xFEFF], //	65279-65279	
    'Halfwidth and Fullwidth Forms': [/* 0xFF00 */0xFF66, 0xFFDC, 0xFFEF], //	65280-65519	
    // 'Specials2': [0xFFF0, 0xFFFD], //	65520-65533	
}

function* mapRange(r: number[]) {
    for (let i = r[0]; i <= r[1]; i++)
        yield String.fromCharCode(i)
}

const str = {
    // alphabetString: alphabetString.split(''),
    // alphabetStringUppercase: alphabetStringUppercase.split(''),
    //'Basic Latin': mapRange(unicode['Basic Latin']),
    //'Latin-1 Supplement': mapRange(unicode['Latin-1 Supplement']),
    'Latin Extended-A': mapRange(unicode['Latin Extended-A']),
    'Latin Extended-B': mapRange(unicode['Latin Extended-B']),
    'IPA Extensions': mapRange(unicode['IPA Extensions']),
    'Spacing Modifier Letters': mapRange(unicode['Spacing Modifier Letters']),
    // 'Combining Diacritical Marks': mapRange(unicode['Combining Diacritical Marks']),
    // 'Greek': mapRange(unicode['Greek']), //not working
    //'Cyrillic': mapRange(unicode['Cyrillic']), //not working
    'Armenian': mapRange(unicode['Armenian']),
    // 'Hebrew': mapRange(unicode['Hebrew']), //reversed,not working
    // 'Arabic': mapRange(unicode['Arabic']), //not working
    ////'Syriac': mapRange(unicode['Syriac']), //all reversed, not working
    // 'Thaana': mapRange(unicode['Thaana']),
    // 'Devanagari': mapRange(unicode['Devanagari']),
    // 'Bengali': mapRange(unicode['Bengali']),
    // 'Gurmukhi': mapRange(unicode['Gurmukhi']),
    // 'Gujarati': mapRange(unicode['Gujarati']),
    // 'Oriya': mapRange(unicode['Oriya']),
    // 'Tamil': mapRange(unicode['Tamil']),
    //'Telugu': mapRange(unicode['Telugu']),
    // 'Kannada': mapRange(unicode['Kannada']),
    // 'Malayalam': mapRange(unicode['Malayalam']),
    // 'Sinhala': mapRange(unicode['Sinhala']),
    // 'Thai': mapRange(unicode['Thai']),
    // 'Lao': mapRange(unicode['Lao']),
    // 'Tibetan': mapRange(unicode['Tibetan']),
    // 'Myanmar': mapRange(unicode['Myanmar']),
    // 'Georgian': mapRange(unicode['Georgian']),
    // 'Hangul Jamo': mapRange(unicode['Hangul Jamo']),
    // 'Ethiopic': mapRange(unicode['Ethiopic']),
    // 'Cherokee': mapRange(unicode['Cherokee']),
    // 'Unified Canadian Aboriginal Syllabics': mapRange(unicode['Unified Canadian Aboriginal Syllabics']),
    // 'Ogham': mapRange(unicode['Ogham']),
    // 'Runic': mapRange(unicode['Runic']),
    // 'Khmer': mapRange(unicode['Khmer']),
    // 'Mongolian': mapRange(unicode['Mongolian']),
    // 'Latin Extended Additional': mapRange(unicode['Latin Extended Additional']),
    // 'Greek Extended': mapRange(unicode['Greek Extended']),
    // //'General Punctuation': mapRange(unicode['General Punctuation']),
    // 'Superscripts and Subscripts': mapRange(unicode['Superscripts and Subscripts']),
    // 'Currency Symbols': mapRange(unicode['Currency Symbols']),
    // 'Combining Marks for Symbols': mapRange(unicode['Combining Marks for Symbols']),
    // 'Letterlike Symbols': mapRange(unicode['Letterlike Symbols']),
    // 'Number Forms': mapRange(unicode['Number Forms']),
    // 'Arrows': mapRange(unicode['Arrows']),
    // 'Mathematical Operators': mapRange(unicode['Mathematical Operators']),
    // 'Miscellaneous Technical': mapRange(unicode['Miscellaneous Technical']),
    // 'Control Pictures': mapRange(unicode['Control Pictures']),
    // 'Optical Character Recognition': mapRange(unicode['Optical Character Recognition']),
    // 'Enclosed Alphanumerics': mapRange(unicode['Enclosed Alphanumerics']),
    // 'Box Drawing': mapRange(unicode['Box Drawing']),
    // 'Block Elements': mapRange(unicode['Block Elements']),
    // 'Geometric Shapes': mapRange(unicode['Geometric Shapes']),
    // 'Miscellaneous Symbols': mapRange(unicode['Miscellaneous Symbols']),
    // 'Dingbats': mapRange(unicode['Dingbats']),
    // 'Braille Patterns': mapRange(unicode['Braille Patterns']),
    // 'CJK Radicals Supplement': mapRange(unicode['CJK Radicals Supplement']), //not working
    // 'Kangxi Radicals': mapRange(unicode['Kangxi Radicals']),
    // 'Ideographic Description Characters': mapRange(unicode['Ideographic Description Characters']), 
    // 'CJK Symbols and Punctuation': mapRange(unicode['CJK Symbols and Punctuation']), //not working
    // 'Hiragana': mapRange(unicode['Hiragana']),
    // 'Katakana': mapRange(unicode['Katakana']),
    // 'Bopomofo': mapRange(unicode['Bopomofo']),
    // 'Hangul Compatibility Jamo': mapRange(unicode['Hangul Compatibility Jamo']),
    // 'Kanbun': mapRange(unicode['Kanbun']),
    // 'Bopomofo Extended': mapRange(unicode['Bopomofo Extended']),
    // 'Enclosed CJK Letters and Months': mapRange(unicode['Enclosed CJK Letters and Months']), //not working
    // 'CJK Compatibility': mapRange(unicode['CJK Compatibility']), //not working
    'CJK Unified Ideographs Extension A': mapRange(unicode['CJK Unified Ideographs Extension A']),
    'CJK Unified Ideographs': mapRange(unicode['CJK Unified Ideographs']),
    // 'Yi Syllables': mapRange(unicode['Yi Syllables']),
    // 'Yi Radicals': mapRange(unicode['Yi Radicals']),
    // 'Hangul Syllables': mapRange(unicode['Hangul Syllables']),
    // 'High Surrogates': mapRange(unicode['High Surrogates']),
    // 'High Private Use Surrogates': mapRange(unicode['High Private Use Surrogates']),
    // 'Low Surrogates': mapRange(unicode['Low Surrogates']),
    // 'Private Use': mapRange(unicode['Private Use']),
    'CJK Compatibility Ideographs': mapRange(unicode['CJK Compatibility Ideographs']),
    // 'Alphabetic Presentation Forms': mapRange(unicode['Alphabetic Presentation Forms']),
    // 'Arabic Presentation Forms-A': mapRange(unicode['Arabic Presentation Forms-A']), //all reversed
    // 'Combining Half Marks': mapRange(unicode['Combining Half Marks']),
    //'CJK Compatibility Forms': mapRange(unicode['CJK Compatibility Forms']), //not working
    // 'Small Form Variants': mapRange(unicode['Small Form Variants']),
    // 'Arabic Presentation Forms-B': mapRange(unicode['Arabic Presentation Forms-B']),
    // // 'Specials': mapRange(unicode['Specials']),
    // 'Halfwidth and Fullwidth Forms': mapRange(unicode['Halfwidth and Fullwidth Forms']),
    // 'Specials2': mapRange(unicode['Specials2']),
}

export const unicodeString = Object.keys(str).map((n) => [...str[n as keyof typeof str]]).flat()
    .map(value => ({ value, sort: Math.random() })) //randomize
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
