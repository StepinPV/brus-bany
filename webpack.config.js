const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const WebpackBar = require('webpackbar');

const NODE_ENV = process.env.NODE_ENV;
const ANALIZE_MODE = process.env.ANALIZE_MODE;

const isProduction = NODE_ENV === 'production';

const publicPath = '/mstatic/build/';

const common = {
    mode: isProduction ? 'production' : 'development',
    stats: {
        assets: true,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        colors: true
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@plugins': path.resolve(__dirname, 'src/plugins/'),
            '@constructor-components': path.resolve(__dirname, 'src/constructorComponents')
        },
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.css/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: '[name]-[local]-[hash:base64:5]'
                        }
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                'autoprefixer',
                                ['postcss-calc', {
                                    mediaQueries: true,
                                    selectors: true
                                }]
                            ]
                        }
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif|webp|svg|woff|woff2)$/,
            type: 'asset/resource'
        }, {
            test: /\.js$/,
            include: [
                /src/
            ],
            use: [{
                loader: 'thread-loader',
                options: {
                    workers: 2
                }
            }, {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }]
    }
};

const client = {
        ...common,
        name: 'client',
        devtool: isProduction ? false : 'source-map',
        entry: {
            main: [
                'whatwg-fetch',
                'core-js/stable',
                'regenerator-runtime/runtime',
                path.join(__dirname, 'src/index.client.js')
            ]
        },
        output: {
            path: path.join(__dirname, 'public' + publicPath),
            publicPath: publicPath,
            filename: '[name].[chunkhash:10].js',
            chunkFilename: '[name].[chunkhash:10].js',
            clean: true
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: 'all',
                    terserOptions: {
                        mangle: {
                            safari10: true
                        },
                        compress: {
                            evaluate: false
                        }
                    }
                })
            ],
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: {
                        test: /[\\/]node_modules[\\/](axios|@babel|classnames|core-js|react|react-dom|redux|react-redux|react-helmet|react-router|react-router-dom)[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `${packageName.replace('@', '').replace('/', '-')}`;
                        },
                        priority: 20
                    }
                },
                maxInitialRequests: Infinity,
                minSize: 0
            }
        },
        plugins: [
            new WebpackBar({
                name: 'client'
            }),
            new WebpackManifestPlugin({
                writeToFileEmit: true
            }),
            new LoadablePlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash:10].css',
                chunkFilename: '[name].[chunkhash:10].css'
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser'
            }),
            ...[...(ANALIZE_MODE ? [new (require('webpack-bundle-analyzer')['BundleAnalyzerPlugin'])] : [])]
        ]
    };

const server = {
        ...common,
        name: 'server',
        devtool: 'source-map',
        target: 'node',
        externals: [
            nodeExternals({ allowlist: [] })
        ],
        externalsPresets: {
            node: true
        },
        entry: [
            './src/index.server.js'
        ],
        output: {
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            path: path.join(__dirname, 'dist/server/'),
            publicPath: publicPath,
            clean: true
        },
        plugins: [
            new WebpackBar({
                name: 'server'
            }),
            new MiniCssExtractPlugin(),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ]
};

module.exports = [client, server];
