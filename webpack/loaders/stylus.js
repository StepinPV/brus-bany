const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env.NODE_ENV === 'production';

    return {
        module: {
            rules: [{
                test: /\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 2,
                            localIdentName: isProduction ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]'
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            browserslist: [
                                'last 2 versions',
                                'last 3 iOS versions'
                            ],
                            plugins: () => [require('autoprefixer')]
                        }
                    }
                ]
            }]
        }
    };
};
