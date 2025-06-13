module.exports = {
  babelrcRoots: [__dirname
  ],
  parserOpts: {
    allowReturnOutsideFunction: true
  },
  presets: [
    [
      "@babel/preset-env",
      {
        "exclude": [
          "@babel/plugin-transform-regenerator",
          "@babel/plugin-transform-async-to-generator"
        ]
      }
    ],
    "@babel/preset-react"
  ]
};
// Update README at 2024-10-13 09:27:23
