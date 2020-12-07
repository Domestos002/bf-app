const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@styles": path.resolve(__dirname, 'src/styles'),
                "@components": path.resolve(__dirname, 'src/components'),
                "@icons": path.resolve(__dirname, 'src/assets/icons'),
                "@images": path.resolve(__dirname, 'src/assets/images'),
            }
        }
    },

    pluginOptions: {
        svgSprite: {
            dir: 'src/assets/icons',
            test: /\.(svg)(\?.*)?$/,
            loaderOptions: {
                extract: true,
                spriteFilename: 'img/icons.[hash:8].svg'
            },
            pluginOptions: {
                plainSprite: true
            }
        }
    },

    chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  }
};
