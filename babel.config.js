module.exports = (api) => {
    const isNode = api.caller(({ target }) => target === 'node');

    return {
        targets: isNode ? {
            node: 'current'
        } : {
            browsers: ['last 2 versions', 'safari >= 9']
        },
        presets: [
            '@babel/preset-react',
            ['@babel/preset-env', {
                useBuiltIns: 'entry',
                modules: isNode ? 'commonjs' : false,
                corejs: 3
            }],
            '@emotion/babel-preset-css-prop'
        ],
        plugins: [
            '@emotion',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@loadable/babel-plugin',
            'babel-plugin-lodash'
        ],
        compact: true,
        env: {
            production: {
                plugins: [
                    ['transform-react-remove-prop-types', { removeImport: true }]
                ]
            }
        }
    };
};
