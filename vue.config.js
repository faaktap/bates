

module.exports = {
  publicPath: '/bates/',
  outputDir:'dist',
  assetsDir:'bt10e',
  "transpileDependencies": [
    "vuetify"
  ],
  pages: {
    index: {
      entry: "./src/pages/home/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Home",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    legal: {
      entry: "./src/pages/legal/main.js",
      template: "public/index.html",
      filename: "legal.html",
      title: "Legal",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  }

}