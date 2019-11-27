const path = require("path");
const apimTools = require("apim-tools");
module.exports = {
  publicPath: "./",
  assetsDir: "static",
  devServer: {
    compress: true,
    port: 9000,
    host: "0.0.0.0",
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    before(app) {
      // do fancy stuff
      const apimMw = apimTools.express({
        port: 9000,
        // 设置存储的 mock 相关数据存储的根目录
        root: path.resolve(__dirname + "./.mock"),
        // 项目 schema token 具体到 apim 平台查看
        schemaToken: "c0a81e63fadb790feb834ac49c065305",
        // 是否启动时候立刻自动同步
        startAutoSync: true
      });
      app.use(apimMw);
    }
  }
};
