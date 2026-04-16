module.exports = {
    babel: {
        plugins: [
            ['import', { libraryName: 'antd', style: 'css' }],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
    },
};
