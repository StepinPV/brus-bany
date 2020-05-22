module.exports = (targets, plugins = []) => ({
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                /src/
            ],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/react',
                        [
                            '@babel/env', {
                                targets,
                                useBuiltIns: 'entry',
                                modules: false,
                                corejs: 3,
                                exclude: ['babel-plugin-transform-async-to-generator', 'babel-plugin-transform-regenerator']
                            }
                        ]
                    ],
                    plugins: [
                        ...plugins,
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        '@babel/proposal-class-properties',
                        '@babel/proposal-object-rest-spread',
                        '@babel/syntax-dynamic-import',
                        ['module:fast-async', { spec: true }],
                        '@loadable/babel-plugin'
                    ],
                    compact: true
                }
            }
        }]
    }
});
