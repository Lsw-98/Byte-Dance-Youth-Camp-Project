const path = require("path"); //Node.js内置模块
module.exports = {
  entry: './src/index.js', //配置入口文件
  output: {
    path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
    filename: 'bundle.js' //输出文件
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },

      {
        test: /\.css$/,
        loader: "stylecss"
      },
    ]
  }

}
