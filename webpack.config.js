const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map', // 可以定位错误到具体的源文件
  devServer: { // webpack-dev-server live-reload功能
    contentBase: "./",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true // 模块热更新
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']), // 每次清理dist文件夹
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }), // 每次重新在dist下生成index.html
    // new webpack.NamedModulesPlugin(), // 以便更容易查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin() // 模块热更新
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        // 处理html源文件，包括html中图片路径加载、监听html文件改变重新编译等
        use: [{
            loader: 'html-loader',
            options: {
                minimize: true,
                removeComments: false,
                collapseWhitespace: false
            }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(css|styl)$/,
        exclude:/node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(jpg|png|ico|jpeg|gif|svg|eot|ttf|otf|woff|woff2)\??.*$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            // 设置生成图片的路径名字信息 [path]相对context，outputPath输出的路径，publicPath相应引用的路径
            name: 'images/[name].[hash].[ext]',
            publicPath: './'
          }
        }
      }
      // {
      //   test: /\.(jpg|png|ico|jpeg|gif|svg)$/,
      //   use: [{
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[ext]",
      //       outputPath: "images/", // 相对于webpack输出目录的相对路径
      //       publicPath: "./images/" // 请求文件时的URL
      //     }
      //   }]
      // },  
      // {
      //   test: /\.(eot|ttf|otf|woff|woff2)\w*/,
      //   use: [{
      //       loader: 'file-loader',
      //       options: {
      //           // 设置生成字体文件的路径名字信息 [path]相对context，outputPath输出的路径，publicPath相应引用的主路径
      //           name: '[name].[ext]',
      //           outputPath: 'images/',
      //           publicPath: '/dist/images/',
      //           // 使用文件的相对路径，这里先不用这种方式
      //           // useRelativePath: isProduction
      //       }
      //   }]
      // }
    ] 
  }
};