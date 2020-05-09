const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = require('./webpack/resolve.js');
const stats = require('./webpack/stats.js');

const babelLoader = require('./webpack/loaders/babel.js');
const stylusLoader = require('./webpack/loaders/stylus.js');
const assetsLoader = require('./webpack/loaders/assets.js');

const NODE_ENV = process.env.NODE_ENV;
const ANALIZE_MODE = process.env.ANALIZE_MODE;

const isProduction = NODE_ENV === 'production';

const publicPath = '/mstatic/build/';

const commonConfig = () => merge([resolve, stats, stylusLoader(process.env), assetsLoader(publicPath)]);

const client = () => merge([
    {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? false : 'source-map',
        entry: {
            main: [
                'whatwg-fetch',
                'core-js/stable',
                path.join(__dirname, 'src/index.client.js')
            ]
        },
        output: {
            path: path.join(__dirname, 'public' + publicPath),
            publicPath: publicPath,
            filename: '[name].[chunkhash:10].js',
            chunkFilename: '[id].[chunkhash:10].js'
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    extractComments: 'all',
                    terserOptions: {
                        mangle: {
                            safari10: true
                        }
                    }
                })
            ],
            runtimeChunk: 'multiple',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: {
                        test: /[\\/]node_modules[\\/](axios|@babel|classnames|core-js|react|react-dom|redux|react-redux|react-helmet|react-router|react-router-dom|react-loadable)[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `${packageName.replace('@', '').replace('/', '-')}`;
                        },
                        priority: 20
                    },
                    components: {
                        test: /[\\/]constructorComponents[\\/](.*?)[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]constructorComponents[\\/](.*?)([\\/]|$)/)[1];
                            return `${packageName.replace('@', '').replace('/', '-')}`;
                        },
                        priority: 0,
                        // TODO
                        enforce: true
                    }
                },
                maxInitialRequests: Infinity,
                minSize: 0
            }
        },
        plugins: [
            new ManifestPlugin({
                writeToFileEmit: true
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 100,
                minChunkSize: 1024
            }),
            new webpack.HashedModuleIdsPlugin(),
            new CleanWebpackPlugin(),
            new ReactLoadablePlugin({
                filename: './dist/react-loadable.json'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                'process.env.ssr': false
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash:10].css',
                chunkFilename: '[id].[chunkhash:10].css'
            }),
            new WebpackBar(),
            ...[...(ANALIZE_MODE ? [new (require('webpack-bundle-analyzer')['BundleAnalyzerPlugin'])] : [])]
        ]
    },
    commonConfig(),
    babelLoader({ browsers: ['last 2 versions', 'safari >= 9'] },
        isProduction ? [['transform-react-remove-prop-types', { removeImport: true }]] : []
    )
]);

const server = () => merge([
    {
        target: 'node',
        mode: isProduction ? 'production' : 'development',
        devtool: 'source-map',
        externals: [
            nodeExternals({ whitelist: [] })
        ],
        entry: [
            './src/index.server'
        ],
        output: {
            path: path.join(__dirname, 'dist/server/'),
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: publicPath
        },
        optimization: {
            minimizer: [new TerserPlugin()]
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            }),
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                'process.env.ssr': true
            }),
            new MiniCssExtractPlugin({
                filename: 'server.css',
                ignoreOrder: true
            }),
            new WebpackBar()
        ]
    },
    commonConfig(),
    babelLoader({ node: '10.15.3' })
]);

module.exports = [client, server];
