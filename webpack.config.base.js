module.exports = {
  target: "web",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage"
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
