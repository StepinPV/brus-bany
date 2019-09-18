module.exports = (publicPath) => {
    return {
        module: {
            rules: [{
                test: /\.(png|jpg|jpeg|gif|webp|svg|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 256,
                        publicPath
                    }
                }]
            }]
        }
    };
};
