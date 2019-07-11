module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext')({
      warnForDuplicates: false
    }),
    require('cssnano'),
    require('postcss-flexibility')
  ]
};
