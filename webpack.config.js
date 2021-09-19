const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: '[name].[chunkhash:4].js',
        path: DIST_DIR
    },
    devtool: 'inline-source-map',
    devServer: {
        host: 'local-ip',
        open: true,
    },  
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                }
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Vue Sandpile',
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    'from': '*.png',
                    'to': DIST_DIR,
                    'context': path.resolve(__dirname, 'src'),
                },
                {
                    'from': '*.ico',
                    'to': DIST_DIR,
                    'context': path.resolve(__dirname, 'src'),
                },
            ]
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
        }
    },
}
