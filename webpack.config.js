// webpack.config.js
const { createWebpackConfigAsync } = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createWebpackConfigAsync(env, argv);
    // Du kannst hier weitere Anpassungen machen, z.B. Aliases:
    // config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
    return config;
};
