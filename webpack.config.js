'use strict';

var root = __dirname + '/';

module.exports = {
    context: root,
    entry  : {
        'components': root + 'entry.js',
    },
    output: {
        path: root,
        filename: '[name].js',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        root: [
            root,
            root + '/components/',
        ],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
