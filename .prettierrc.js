module.exports = {
    // Basic formatting
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'consistent',
    trailingComma: 'none',

    // Spacing
    bracketSpacing: true,
    arrowParens: 'always',

    // Line breaks
    endOfLine: 'lf',

    // TypeScript
    parser: 'typescript',

    // Override for specific file types
    overrides: [
        {
            files: '*.ts',
            options: {
                parser: 'typescript'
            }
        },
        {
            files: '*.js',
            options: {
                parser: 'babel'
            }
        },
        {
            files: '*.json',
            options: {
                parser: 'json',
                tabWidth: 2
            }
        },
        {
            files: '*.md',
            options: {
                parser: 'markdown',
                proseWrap: 'preserve'
            }
        }
    ]
};
