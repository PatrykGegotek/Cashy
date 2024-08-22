const { alias } = require('react-app-rewired');
const path = require('path');

module.exports = function override(config) {
    alias({
        '@components': path.resolve(__dirname, 'src/components'),
        '@models': path.resolve(__dirname, 'src/models')
    })(config);

    return config;
};
