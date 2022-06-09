const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: path.resolve(__dirname, "src/index.ts"),
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
               loader: "ts-loader",
            },
         },
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
               {
                  loader: "style-loader",
               },
               {
                  loader: "css-loader",
               },
            ],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, "./index.html"),
      }),
   ],
   devtool: "source-map",
   mode: "development",
   devServer: {
      static: path.resolve(__dirname, "./dist"),
      open: true,
      port: 4000,
   },
};
