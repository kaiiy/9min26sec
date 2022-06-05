const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist', "js"),
        clean: true
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial'
        }
    },
    module: {
        rules: [
            {
                test: /\.s?css/,
                use: [
                    'style-loader',
                    'css-loader',
                    "sass-loader"
                ]
            },
        ]
    },
};