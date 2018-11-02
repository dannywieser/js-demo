const outpath = __dirname + '/../../../gh-pages/js-demo-redux-example';
console.log(outpath);
module.exports = require('@js-demo/core/webpack/webpack').demoConfig('_demo', outpath);
