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
              "@babel/preset-flow",
              [
                "@babel/preset-env",
                { targets: { browsers: ["last 7 versions"] } }
              ]
            ],
            plugins: [
              "@babel/plugin-transform-flow-strip-types",
              "@babel/plugin-syntax-dynamic-import",
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        }
      }
    ]
  }
};
