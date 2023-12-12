const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/wedding',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://us-central1-fir-3c30d.cloudfunctions.net',
        changeOrigin: true,
        ws: true,
        // TODO 공부해보기
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
});
